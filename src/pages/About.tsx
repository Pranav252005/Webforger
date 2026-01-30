import React from 'react';
import GradientBlinds from '../components/GradientBlinds';

const About: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <GradientBlinds
        gradientColors={['#FF9FFC', '#5227FF']}
        angle={20}
        noise={0.5}
        blindCount={16}
        blindMinWidth={60}
        spotlightRadius={0.45}
        spotlightSoftness={1}
        spotlightOpacity={1}
        mouseDampening={0.05}
        distortAmount={0}
        shineDirection="left"
        mixBlendMode="lighten"
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '3rem',
          fontWeight: 'bold',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <div>
          <div>About Us</div>
          <div style={{ marginTop: '0.75rem', fontSize: '1.5rem', fontWeight: 700 }}>Coming soon!</div>
        </div>
      </div>
    </div>
  );
};

export default About;
