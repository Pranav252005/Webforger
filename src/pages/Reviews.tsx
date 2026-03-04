import React, { useState, useEffect } from 'react';
import FaultyTerminal from '../components/FaultyTerminal';

const Reviews: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', backgroundColor: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <FaultyTerminal
          scale={isDesktop ? 2.4 : 1.5}
          gridMul={isDesktop ? [2, 1] : [1, 1]}
          digitSize={isDesktop ? 1.2 : 0.8}
          timeScale={0.6}
          pause={false}
          scanlineIntensity={isDesktop ? 0.5 : 0.2}
          glitchAmount={isDesktop ? 1 : 0.3}
          flickerAmount={isDesktop ? 1 : 0.3}
          noiseAmp={isDesktop ? 1 : 0.5}
          chromaticAberration={0}
          dither={0}
          curvature={isDesktop ? 0.17 : 0}
          tint="#4fca3f"
          mouseReact={false}
          mouseStrength={0.5}
          pageLoadAnimation
          brightness={0.6}
        />
      </div>
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '0 20px',
        textAlign: 'center',
        fontFamily: "'Archivo Black', system-ui, sans-serif",
        color: '#ffffffff',
        textShadow: '0 0 10px rgba(79, 202, 63, 0.8), 0 0 20px rgba(79, 202, 63, 0.4)',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', margin: 0, letterSpacing: '4px', textTransform: 'uppercase' }}>
          Reviews
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', marginTop: '0.5rem', letterSpacing: '2px', fontWeight: 400, opacity: 0.9, maxWidth: '600px' }}>
          deploying a mashup video of all the reviews very soon.
        </p>
      </div>
    </div>
  );
};

export default Reviews;