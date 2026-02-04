import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
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
        </div>
      </BrowserRouter>
    </DeviceProvider>
  );
}

export default App;
