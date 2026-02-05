import ColorBends from '../ColorBends';
import TextType from '../TextType';
import { useRef } from 'react';

export default function Home() {
  const hasOpenedMenuRef = useRef(false);

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
        fontSize: '4rem',
        fontWeight: 'bold',
        color: '#ffffff',
        maxWidth: '90%',
        zIndex: 10,
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
    </>
  );
}

// noop: redeploy
