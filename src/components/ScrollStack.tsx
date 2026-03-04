import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div 
    className={`scroll-stack-card ${itemClassName}`.trim()}
    style={{ 
      width: '100%', 
      position: 'relative', 
      boxSizing: 'border-box' 
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

// Singleton to manage shared Lenis instance for window scrolling
let globalLenis: Lenis | null = null;
let globalLenisListeners: Set<() => void> = new Set();
let globalLenisRafId: number | null = null;

const addGlobalLenisListener = (callback: () => void) => {
  globalLenisListeners.add(callback);
  if (!globalLenis) {
    globalLenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075
    });

    globalLenis.on('scroll', () => {
      globalLenisListeners.forEach(cb => cb());
    });

    const raf = (time: number) => {
      globalLenis?.raf(time);
      globalLenisRafId = requestAnimationFrame(raf);
    };
    globalLenisRafId = requestAnimationFrame(raf);
  }
  return () => {
    globalLenisListeners.delete(callback);
    if (globalLenisListeners.size === 0) {
      if (globalLenisRafId) {
        cancelAnimationFrame(globalLenisRafId);
        globalLenisRafId = null;
      }
      globalLenis?.destroy();
      globalLenis = null;
    }
  };
};

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const removeLenisListenerRef = useRef<(() => void) | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const initialTopsRef = useRef<number[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller!.scrollTop,
        containerHeight: scroller!.clientHeight,
        scrollContainer: scroller!
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    
    // Guard: If we haven't calculated initial tops yet, don't update
    if (initialTopsRef.current.length === 0 || initialTopsRef.current.length !== cardsRef.current.length) {
        return;
    }

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    // Always look inside our own ref to avoid conflicts with other instances
    const endElement = scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement;

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // Ensure proper stacking order (first card on top)
      card.style.zIndex = `${cardsRef.current.length - i}`;

      const cardTop = initialTopsRef.current[i] ?? getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = initialTopsRef.current[j] ?? getElementOffset(cardsRef.current[j]);
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      const cleanup = addGlobalLenisListener(() => {
        handleScroll();
      });
      removeLenisListenerRef.current = cleanup;
      return globalLenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    // 1. Apply static styles that affect layout (margins) and stacking (z-index) FIRST
    cards.forEach((card, i) => {
      // Reset transforms temporarily
      card.style.transform = 'none';
      card.style.webkitTransform = 'none';
      card.style.filter = 'none';

      // Apply Layout Styles
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}vh`;
      }
      
      // Apply Stacking Context
      // Ensure proper stacking order (newer cards on top)
      card.style.zIndex = `${i + 1}`;
      
      // Apply Animation Props
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
      
      // Initialize transform to identity for hardware acceleration (will be overwritten by update)
      // card.style.transform = 'translateZ(0)'; // Don't do this yet, we need to measure
    });
    
    // 2. Define layout calculation function
    const calculateLayout = () => {
      // Clear transform cache since we are resetting the DOM
      lastTransformsRef.current.clear();

      // Temporarily reset transforms to measure natural positions
      // We only need to reset the transform property itself, not margins
      cards.forEach(card => {
        card.style.transform = 'none';
        card.style.webkitTransform = 'none';
        // filter is already handled in updateCardTransforms but good to reset for purity
      });

      // Force reflow to ensure styles are applied
      void scroller.offsetHeight;

      // Measure positions
      initialTopsRef.current = cards.map(card => getElementOffset(card));

      // Sanity check: if all tops are 0 or unreasonably small (given we have large padding), retry
      // We expect the first card to be at least somewhat down the page due to padding (approx 30vh)
      const firstTop = initialTopsRef.current[0] || 0;
      // Use a conservative threshold (e.g. 10px) to catch cases where it's essentially 0 or unpositioned
      const isUnreasonablySmall = firstTop < 10;
      const allZero = initialTopsRef.current.every(t => t === 0);
      
      if (cards.length > 0 && (allZero || isUnreasonablySmall)) {
        // If we fail to measure, schedule a retry
        // Use a slightly increasing backoff or just a fixed delay
        setTimeout(calculateLayout, 100);
        return;
      }
      
      // Re-apply transforms based on measurements
      updateCardTransforms();
    };

    // 3. Initial Layout Calculation
    calculateLayout();

    // 4. Setup Observers
    const resizeObserver = new ResizeObserver(() => {
      calculateLayout();
    });

    cards.forEach(card => resizeObserver.observe(card));
    if (scroller) resizeObserver.observe(scroller);
    if (useWindowScroll) resizeObserver.observe(document.body);

    // 5. Handle font loading
    document.fonts.ready.then(() => {
      calculateLayout();
    });

    // Safety checks for layout stability
    const timeouts = [100, 500, 1000, 2000].map(delay => 
      setTimeout(() => calculateLayout(), delay)
    );

    setupLenis();
    updateCardTransforms();

    return () => {
      resizeObserver.disconnect();
      timeouts.forEach(clearTimeout);
      
      if (removeLenisListenerRef.current) {
        removeLenisListenerRef.current();
        removeLenisListenerRef.current = null;
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms
  ]);

  return (
    <div 
      className={`scroll-stack-scroller ${className}`.trim()} 
      ref={scrollerRef}
      style={useWindowScroll ? { overflow: 'visible', height: 'auto' } : undefined}
    >
      <div className="scroll-stack-inner">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end" style={{ height: '50vh' }} />
      </div>
    </div>
  );
};

export default ScrollStack;
