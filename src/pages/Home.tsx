import ColorBends from '../ColorBends';
import TextType from '../TextType';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const hasOpenedMenuRef = useRef(false);
  const navigate = useNavigate();

  return (
    <>
      <ColorBends
        style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0 }}
        colors={["#5d0011ff", "#009264ff", "#2b00ffff"]}
        rotation={0}
        speed={0.2}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.1}
        transparent
        autoRotate={0}
      />
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '90%',
        maxWidth: '800px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <div style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          lineHeight: 1.2,
          fontWeight: 'bold',
          color: '#ffffff',
          fontFamily: 'Bookman Old Style, serif'
        }}>
          <TextType 
            text={[
              "We provide experiences not just a use-case!",
              "Here, at WebForger we care."
            ]}
            typingSpeed={80}
            pauseDuration={2200}
            deletingSpeed={60}
            showCursor
            cursorCharacter="|"
            cursorBlinkDuration={0.5}
            variableSpeed={{ min: 60, max: 100 }}
            loop
            onSentenceTyped={(_, index) => {
              if (index === 1 && !hasOpenedMenuRef.current) {
                hasOpenedMenuRef.current = true;
                setTimeout(() => {
                  window.dispatchEvent(new Event('webforger:open-menu'));
                }, 800);
              }
            }}
          />
        </div>
        
        <button
          onClick={() => navigate('/contact')}
          style={{
            padding: '12px 32px',
            fontSize: '1.2rem',
            fontWeight: 600,
            color: '#fff',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '30px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            fontFamily: 'system-ui, sans-serif',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
          }}
        >
          Let's Talk
        </button>
      </div>
    </>
  );
}

// noop: redeploy
