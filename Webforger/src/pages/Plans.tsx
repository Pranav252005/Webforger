import Plasma from '../Plasma';
import MagicBento from '../components/MagicBento';

export default function Plans() {
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%', 
      height: '100%',
      overflow: 'hidden'
    }}>
      <Plasma 
        color="#8b5cf6"
        speed={1}
        direction="forward"
        scale={1.5}
        opacity={1}
        mouseInteractive={true}
      />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 10,
        fontWeight: 800,
        fontFamily: "'Archivo Black', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 20px',
          minHeight: '100%'
        }}>
        <MagicBento 
          textAutoHide={true}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt
          enableMagnetism={false}
          clickEffect
          spotlightRadius={50}
          particleCount={12}
          glowColor="132, 0, 255"
          disableAnimations={false}
        />
        </div>
      </div>
    </div>
  );
}
