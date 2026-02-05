import Squares from '../components/Squares';

export default function Blog() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Squares
        speed={0.5}
        squareSize={35}
        direction="right"
        borderColor="#4100b3"
        hoverFillColor="#460047"
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          color: '#ffffff',
          textAlign: 'center',
          fontFamily: 'Bookman Old Style, serif'
        }}
      >
        <div>
          <h1 style={{ fontSize: '3rem', fontWeight: 700 }}>Blog</h1>
          <p style={{ marginTop: '0.75rem', fontSize: '1.5rem', fontWeight: 700 }}>Coming soon!</p>
          <p style={{ marginTop: '0.75rem', fontSize: '1.25rem' }}>Stories, updates, and thoughts from WebForger</p>
        </div>
      </div>
    </div>
  );
}

// noop: redeploy
