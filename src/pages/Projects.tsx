import React from 'react';
import LightPillar from '../components/LightPillar';
import MagicBento, { BentoCardProps } from '../components/MagicBento';

const Projects: React.FC = () => {
  const projects: BentoCardProps[] = [
    {
      label: 'cafe',
      title: 'Example cafe',
      description: 'luccabakehouse.netlify.app',
      color: '#0a0a0a',
      image: '/LB.png'
    },
    {
      label: 'Stock Analyst',
      title: 'TheAnalystAI',
      description: 'theanalystai.com',
      color: '#0a0a0a',
      image: '/AA.png'
    },
    {
      label: 'Jewelry',
      title: 'Shvyra',
      description: 'shvyra.com',
      color: '#0a0a0a',
      image: '/S.png'
    },
    {
      label: 'Jewelry',
      title: 'Shivora',
      description: 'myshivora.com',
      color: '#0a0a0a',
      image: '/Sh.png'
    },
    {
      label: 'AI receptionist',
      title: 'Recepta',
      description: 'receptaai.netlify.app',
      color: '#0a0a0a',
      image: '/Re.png'
    }
  ];

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: '#ffffff',
        overflowX: 'hidden'
      }}
    >
      <div style={{ width: '100%', height: '100vh', position: 'fixed', inset: 0, zIndex: 0 }}>
        <LightPillar
          topColor="#ff0392"
          bottomColor="#f59e9e"
          intensity={1.5}
          rotationSpeed={0.1}
          glowAmount={0.001}
          pillarWidth={9.3}
          pillarHeight={0.8}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="overlay"
          quality="medium"
        />
      </div>

      <div 
        style={{
          position: 'relative',
          paddingTop: 'clamp(8vh, 12vh, 15vh)',
          width: '100%',
          textAlign: 'center',
          zIndex: 10,
          paddingBottom: '2rem',
          pointerEvents: 'none'
        }}
      >
        <h1 style={{
          fontFamily: "'Archivo Black', system-ui, sans-serif",
          fontSize: 'clamp(2.5rem, 8vw, 4rem)',
          color: '#ffffff',
          margin: 0,
          lineHeight: 1.1,
          letterSpacing: '2px',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}>
          PROJECTS
        </h1>
      </div>

      <div style={{ position: 'relative', zIndex: 1, marginTop: '-3vh', width: '100%' }}>
        <MagicBento 
          items={projects}
          textAutoHide={true}
          enableStars={false}
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism
          clickEffect
          spotlightRadius={450}
          particleCount={12}
          glowColor="94, 33, 33"
          disableAnimations={false}
        />
      </div>
    </div>
  );
};

export default Projects;
