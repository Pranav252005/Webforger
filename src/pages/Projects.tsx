import React from 'react';
import LightPillar from '../components/LightPillar';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';

const About: React.FC = () => {
  const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: 'clamp(16px, 4vw, 24px)',
    padding: 'clamp(1.5rem, 5vw, 2.5rem) clamp(1.5rem, 6vw, 3.5rem)',
    color: '#ffffff',
    fontFamily: "'Archivo Black', system-ui, sans-serif",
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    width: '90%',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 40px rgba(245, 158, 158, 0.05)',
    transition: 'background 0.3s ease',
    cursor: 'pointer'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(1.4rem, 4vw, 2.5rem)',
    margin: 0,
    letterSpacing: '1px',
    fontWeight: 900
  };

  const linkStyle: React.CSSProperties = {
    color: '#f59e9e',
    textDecoration: 'none',
    fontSize: 'clamp(0.9rem, 3vw, 1.2rem)',
    opacity: 0.8,
    transition: 'opacity 0.2s',
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const websites = [
    { name: '1.Shvyra', link: 'https://shvyra.com' },
    { name: '2.TheAnalystAI', link: 'https://theanalystai.com' },
    { name: '3.Recepta', link: 'https://recepta.ai' },
    { name: '4.Lucca Cafe', link: 'https://luccacafe.netlify.app' },
    { name: '5.Social Crust', link: 'https://socialcrust.netlify.app' },
    { name: '6.Shivora', link: 'https://shivora.netlify.app' }
  ];

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: '#000'
      }}
    >
      <div style={{ width: '100%', height: '100vh', position: 'fixed', inset: 0, zIndex: 0 }}>
        <LightPillar
          topColor="#1f0f18"
          bottomColor="#f59e9e"
          intensity={1.2}
          rotationSpeed={0.1}
          glowAmount={0.001}
          pillarWidth={9.3}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="screen"
          quality="high"
        />
      </div>

      <div 
        style={{
          position: 'fixed',
          top: 'clamp(8vh, 12vh, 15vh)',
          left: '0',
          width: '100%',
          textAlign: 'center',
          zIndex: 10,
          pointerEvents: 'none',
          padding: '0 20px',
          boxSizing: 'border-box'
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
          OUR PROJECTS
        </h1>
      </div>

      <div style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(30vh, 40vh, 45vh)', paddingBottom: '10vh' }}>
        <ScrollStack
          useWindowScroll={true}
          itemDistance={20}
          itemStackDistance={40}
          baseScale={0.85}
          itemScale={0.03}
          stackPosition="45%"
          blurAmount={3}
        >
          {websites.map((site, index) => (
            <ScrollStackItem key={index}>
              <div 
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={() => window.open(site.link, '_blank')}
              >
                <h2 style={titleStyle}>{site.name}</h2>
                <a 
                  href={site.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={linkStyle}
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                >
                  Visit Site ↗
                </a>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
};

export default About;
