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
        padding: '10vh 20px',
        minHeight: '100%',
        width: '100%',
        fontFamily: "'Archivo Black', system-ui, sans-serif",
        color: '#ffffffff',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
          margin: '0 0 2rem 0', 
          letterSpacing: '4px', 
          textTransform: 'uppercase',
          textShadow: '0 0 10px rgba(79, 202, 63, 0.8), 0 0 20px rgba(79, 202, 63, 0.4)'
        }}>
          Reviews
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          width: '100%',
          maxWidth: '1200px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          {[
            {
              name: 'TheAnalystAI',
              review: "Webforger transformed our complex AI tool into an incredibly sleek, accessible web experience. Their attention to detail and understanding of modern design trends is unmatched. It feels fast, looks professional, and genuinely elevated our brand.",
              rating: '★★★★★'
            },
            {
              name: 'Recepta',
              review: "Working with Webforger was a breeze. They took our concept for an AI receptionist service and gave it a stunning visual identity online. The site is highly responsive and perfectly captures the high-tech, welcoming vibe we wanted.",
              rating: '★★★★★'
            },
            {
              name: 'Shivora',
              review: "As a jewelry brand, aesthetics are everything to us. Webforger delivered a beautifully elegant and luxurious website that perfectly showcases our pieces. We've seen a noticeable increase in engagement since the launch.",
              rating: '★★★★★'
            },
            {
              name: 'Shvyra',
              review: "Absolutely stellar work! They managed to balance a highly visual design with exceptional performance. The sleek animations and intuitive layout make browsing our collections a joy for our customers.",
              rating: '★★★★★'
            }
          ].map((item, index) => (
            <div key={index} style={{
              background: 'rgba(10, 25, 10, 0.7)',
              border: '1px solid rgba(79, 202, 63, 0.3)',
              borderRadius: '16px',
              padding: '2rem',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(79, 202, 63, 0.8)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(79, 202, 63, 0.3)';
            }}>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: '#e0ffe0',
                marginBottom: '1.5rem',
                fontStyle: 'italic',
                fontWeight: 300
              }}>
                "{item.review}"
              </p>
              <div>
                <div style={{ color: '#4fca3f', letterSpacing: '2px', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                  {item.rating}
                </div>
                <div style={{
                  fontFamily: "'Archivo Black', system-ui, sans-serif",
                  color: '#ffffff',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontSize: '1.2rem'
                }}>
                  {item.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;