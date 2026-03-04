import React from 'react';
import FaultyTerminal from '../components/FaultyTerminal';

const Reviews: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', backgroundColor: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <FaultyTerminal
          scale={2.4}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.6}
          pause={false}
          scanlineIntensity={0.5}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.17}
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