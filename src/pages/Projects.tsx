import React, { useState, useEffect } from 'react';
import LightPillar from '../components/LightPillar';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';

const About: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <style>{`
        .project-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: clamp(16px, 4vw, 24px);
          padding: clamp(1.5rem, 5vw, 2.5rem) clamp(1.5rem, 6vw, 3.5rem);
          color: #ffffff;
          font-family: 'Archivo Black', system-ui, sans-serif;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          width: 90%;
          max-width: 800px;
          margin: 0 auto;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 0 0 40px rgba(245, 158, 158, 0.05);
          transition: background 0.3s ease;
          cursor: pointer;
          box-sizing: border-box;
        }

        .project-card:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .project-title {
          font-size: clamp(1.4rem, 4vw, 2.5rem);
          margin: 0;
          letter-spacing: 1px;
          font-weight: 900;
          flex: 1;
        }

        .project-link {
          color: #f59e9e;
          text-decoration: none;
          font-size: clamp(0.9rem, 3vw, 1.2rem);
          opacity: 0.8;
          transition: opacity 0.2s;
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .project-link:hover {
          opacity: 1;
        }

        @media (max-width: 480px) {
          .project-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.5rem;
            gap: 0.75rem;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            background: rgba(255, 255, 255, 0.05);
          }
          .project-title {
            font-size: clamp(1.2rem, 6vw, 1.6rem);
            word-break: break-word;
            overflow-wrap: break-word;
            white-space: normal;
            width: 100%;
            line-height: 1.2;
          }
          .project-link {
            align-self: flex-start;
            margin-top: 0.25rem;
            font-size: 1rem;
          }
        }
      `}</style>

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
          quality={isDesktop ? "high" : "low"}
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

      <div className="projects-scroll-wrapper" style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(30vh, 40vh, 45vh)', paddingBottom: '5vh' }}>
        <ScrollStack
          useWindowScroll={true}
          itemDistance={isDesktop ? 20 : 15}
          itemStackDistance={isDesktop ? 40 : 80}
          baseScale={isDesktop ? 0.85 : 0.95}
          itemScale={isDesktop ? 0.03 : 0.01}
          stackPosition={isDesktop ? "45%" : "50%"}
          blurAmount={isDesktop ? 3 : 1.5}
        >
          {websites.map((site, index) => (
            <ScrollStackItem key={index}>
              <div 
                className="project-card"
                onClick={() => window.open(site.link, '_blank')}
              >
                <h2 className="project-title">{site.name}</h2>
                <a 
                  href={site.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link"
                  onClick={(e) => e.stopPropagation()}
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
