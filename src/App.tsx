import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import lottie from 'lottie-web';
import BubbleMenu from './BubbleMenu';
import { DeviceProvider } from './lib/device';
import Home from './pages/Home';
import Plans from './pages/Plans';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

const items = [
  {
    label: 'Home',
    href: '/',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'About',
    href: '/about',
    ariaLabel: 'About',
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
  },
  {
    label: 'Plans',
    href: '/plans',
    ariaLabel: 'Plans',
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
  },
  {
    label: 'Blog',
    href: '/blog',
    ariaLabel: 'Blog',
    rotation: 8,
    hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
  },
  {
    label: 'Contact',
    href: '/contact',
    ariaLabel: 'Contact',
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
  }
];

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [showLoader, setShowLoader] = useState(() => !sessionStorage.getItem('wf_loader_seen'));
  const [exiting, setExiting] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current) return;
    const anim = lottie.loadAnimation({
      container: loaderRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/MoldWizards.json'
    });
    return () => anim.destroy();
  }, []);

  useEffect(() => {
    if (!showLoader) return;

    const start = performance.now();
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, 5000 - elapsed);
      setTimeout(() => {
        setExiting(true);
        setTimeout(() => {
          setShowLoader(false);
          sessionStorage.setItem('wf_loader_seen', '1');
        }, 700);
      }, wait);
    };

    const onLoad = () => finish();
    window.addEventListener('load', onLoad);
    const fallback = setTimeout(() => finish(), 12000);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(fallback);
    };
  }, [showLoader]);

  return (
    <DeviceProvider>
      <BrowserRouter>
        <div className="app">
          <Link
            to="/"
            aria-label="Go to Home"
            style={{
              position: 'fixed',
              top: '2em',
              left: '2em',
              zIndex: 100,
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none'
            }}
          >
            <img
              src="/Webforger.png"
              alt="Webforger"
              style={{
                height: '56px',
                width: 'auto',
                display: 'block'
              }}
            />
            <span
              style={{
                fontFamily: "'Archivo Black', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
                fontSize: '24px',
                color: '#ffffff',
                letterSpacing: '0.5px',
                lineHeight: 1
              }}
            >
              Webforger
            </span>
          </Link>
          <BubbleMenu
            logo="/Webforger.png"
            items={items}
            menuAriaLabel="Toggle navigation"
            menuBg="white"
            menuContentColor="#111111"
            useFixedPosition
            animationEase="power3.out"
            animationDuration={0.5}
            staggerDelay={0.12}
          />
          <AnimatedRoutes />
          <span
            style={{
              position: 'fixed',
              bottom: 6,
              left: '50%',
              transform: 'translateX(-50%)',
              padding: 0,
              margin: 0,
              color: '#ffffff',
              fontFamily: "'Archivo Black', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
              letterSpacing: '0.4px',
              lineHeight: 1.1,
              pointerEvents: 'none',
              background: 'transparent',
              boxShadow: 'none',
              mixBlendMode: 'normal',
              textAlign: 'center',
              display: 'inline-block',
              width: 'auto',
              zIndex: 9999
            }}
          >
            We are a web development company
          </span>

          {showLoader && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#000',
                pointerEvents: 'auto',
                opacity: exiting ? 0 : 1,
                transition: 'opacity 0.5s ease'
              }}
            >
              <style>{`
                @keyframes loaderBounce {
                  0% { transform: translateY(0) scale(0.96); }
                  50% { transform: translateY(-10px) scale(1.02); }
                  100% { transform: translateY(0) scale(0.96); }
                }
                @keyframes loaderExit {
                  0% { opacity: 1; transform: scale(1); }
                  100% { opacity: 0; transform: scale(1.35); }
                }
              `}</style>
              <div
                style={{
                  width: '320px',
                  height: '320px',
                  animation: exiting
                    ? 'loaderExit 0.6s ease forwards'
                    : 'loaderBounce 1.6s ease-in-out infinite',
                  filter: 'drop-shadow(0 14px 26px rgba(0,0,0,0.5))'
                }}
              >
                <div ref={loaderRef} style={{ width: '100%', height: '100%' }} aria-label="Loading" />
              </div>
            </div>
          )}
        </div>
      </BrowserRouter>
    </DeviceProvider>
  );
}

export default App;
