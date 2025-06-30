import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import '@fontsource/cinzel-decorative';
import '@fontsource/playfair-display';

const images = [
  { src: '/D10.jpg', alt: 'Disha 10' },
  { src: '/D5.jpg', alt: 'Disha 5' },
  { src: '/D2.jpg', alt: 'Disha 2' },
  { src: '/D6.jpg', alt: 'Disha 6' },
  { src: '/D8.jpg', alt: 'Disha 8' },
  { src: '/D12.jpg', alt: 'Disha 12' },
];

const GlobalStyle = createGlobalStyle`
  body {
    background: #0a090f;
    color: #fff;
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: 'Playfair Display', serif;
  }
`;

const shimmer = keyframes`
  0% { filter: drop-shadow(0 0 16px #FFD70088) drop-shadow(0 0 32px #FFD70044); }
  50% { filter: drop-shadow(0 0 32px #FFD700cc) drop-shadow(0 0 64px #FFD70088); }
  100% { filter: drop-shadow(0 0 16px #FFD70088) drop-shadow(0 0 32px #FFD70044); }
`;

const LuxBg = styled.div.attrs({ className: 'lux-bg' })``;

const CenterStage = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const GlowingHeader = styled.h1`
  font-family: 'Cinzel Decorative', serif;
  font-size: 4.5rem;
  color: #FFD700;
  letter-spacing: 0.18em;
  text-shadow:
    0 0 24px #FFD700,
    0 0 48px #FFD70088,
    0 0 96px #fff2;
  filter: drop-shadow(0 0 18px #FFD70088);
  margin-bottom: 2.5rem;
  margin-top: 2.5rem;
  user-select: none;
  pointer-events: none;
  text-align: center;
  animation: ${shimmer} 2.5s infinite alternate;
  @media (max-width: 900px) {
    font-size: 2.2rem;
    margin-top: 1.2rem;
  }
`;

const CarouselWrapper = styled.div`
  width: 100vw;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
`;

const CarouselInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 60vh;
  pointer-events: none;
`;

const CarouselImage = styled(motion.img).attrs({ className: 'carousel-image' })`
  position: absolute;
  top: -50%;
  left: 34%;
  object-fit: cover;
  border-radius: 2.5rem;
  box-shadow: 0 0 48px 8px #FFD70044, 0 0 0 4px #FFD70088;
  user-select: none;
  will-change: transform, opacity, filter;
  pointer-events: none;
  transition: box-shadow 0.3s, filter 0.3s;
`;

function getImageProps(idx, centerIdx, total) {
  let offset = idx - centerIdx;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  const absOffset = Math.abs(offset);
  if (absOffset > 2) return { style: { display: 'none' } };
  // Main image (vertical 16:9)
  if (offset === 0) {
    return {
      style: {
        width: '18vw',
        height: '32vw',
        minWidth: '100px',
        minHeight: '180px',
        zIndex: 10,
        opacity: 1,
        filter: 'drop-shadow(0 0 48px #FFD70088) blur(0.5px)',
        transform: 'translate(-50%, -50%) scale(1) rotateY(0deg)',
        boxShadow: '0 0 48px 8px #FFD70088, 0 0 0 4px #FFD700',
      },
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { type: 'spring', stiffness: 200, damping: 30 },
    };
  }
  // Side images (vertical 16:9)
  const baseScale = 0.7 + 0.15 * (2 - absOffset);
  const baseOpacity = 0.45 + 0.25 * (2 - absOffset);
  const baseZ = 10 - absOffset;
  const baseX = offset * 32 + (offset > 0 ? 8 : -8) * absOffset;
  const baseRotateY = offset * -32;
  const blur = 2 + absOffset * 2;
  return {
    style: {
      width: '10vw',
      height: '18vw',
      minWidth: '60px',
      minHeight: '90px',
      zIndex: baseZ,
      opacity: baseOpacity,
      filter: `blur(${blur}px) brightness(0.8) drop-shadow(0 0 32px #FFD70044)`,
      transform:
        `translate(-50%, -50%) translateX(${baseX}vw) scale(${baseScale}) rotateY(${baseRotateY}deg)`
    },
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: baseOpacity, scale: baseScale },
    exit: { opacity: 0, scale: 0.8 },
    transition: { type: 'spring', stiffness: 200, damping: 30 },
  };
}

function App() {
  const [centerIdx, setCenterIdx] = useState(0);
  const total = images.length;
  const autoScrollRef = useRef();

  // Infinite auto-scroll
  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      setCenterIdx(idx => (idx + 1) % total);
    }, 3200);
    return () => clearInterval(autoScrollRef.current);
  }, [total]);

  return (
    <>
      <GlobalStyle />
      <LuxBg />
      <CenterStage>
        <GlowingHeader>DISHA</GlowingHeader>
        <CarouselWrapper>
          <CarouselInner>
            <AnimatePresence initial={false}>
              {images.map((img, idx) => {
                const props = getImageProps(idx, centerIdx, total);
                return (
                  <CarouselImage
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    draggable={false}
                    {...props}
                  />
                );
              })}
            </AnimatePresence>
          </CarouselInner>
        </CarouselWrapper>
      </CenterStage>
    </>
  );
}

export default App;
