import Plasma from '../Plasma';

export default function Plans() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#0c0a1a'
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Plasma
          color="#8b5cf6"
          speed={1}
          direction="forward"
          scale={1.5}
          opacity={1}
          mouseInteractive={true}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 35%), radial-gradient(circle at 80% 30%, rgba(139,92,246,0.25), transparent 40%), linear-gradient(180deg, rgba(12,10,26,0.4), rgba(12,10,26,0.85))'
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          color: '#e7e7ff',
          fontFamily: "'Archivo Black', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
          padding: '72px 20px 96px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'grid',
            paddingTop: '72px',
            gap: '32px'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p style={{ letterSpacing: '0.08em', color: '#c4b5fd', marginBottom: 8 }}>PLANS</p>
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 54px)', margin: 0 }}>Choose your flow</h1>
            <p
              style={{
                maxWidth: 640,
                margin: '12px auto 0',
                fontWeight: 500,
                color: '#c7c8d9'
              }}
            >
              Fluid pricing tiers tailored for creators, teams, and ambitious builds.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              { title: 'Starter', desc: 'Launch-ready features with guided onboarding, and tips for better UI/UX.' },
              { title: 'Creator', desc: 'Dynamic effects, performance tuning, and priority help + everthing in Starter.' },
              { title: 'Studio', desc: '3D assets, performance tuning, and SEO integration + everything in Starter and Creator.' }
            ].map((plan) => (
              <div
                key={plan.title}
                style={{
                  background: 'rgba(12,10,26,0.72)',
                  border: '1px solid rgba(196,181,253,0.18)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                  borderRadius: 20,
                  padding: '28px 24px',
                  backdropFilter: 'blur(10px) saturate(140%)',
                  transition: 'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(40, 7, 119, 0.5)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(139,92,246,0.28)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(196,181,253,0.18)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
                }}
              >
                <h3 style={{ margin: '0 0 8px', fontSize: 22 }}>{plan.title}</h3>
                <p style={{ margin: '0 0 16px', color: '#c7c8d9', fontWeight: 500 }}>{plan.desc}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ color: '#8a7fa2ff', fontWeight: 600 }}>Negotiable</span>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 16,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                maxWidth: 480,
                background: 'rgba(12,10,26,0.78)',
                border: '1px solid rgba(196,181,253,0.18)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                borderRadius: 20,
                padding: '28px 24px',
                backdropFilter: 'blur(10px) saturate(140%)',
                transition: 'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(40, 7, 119, 0.5)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(139,92,246,0.28)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(196,181,253,0.18)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
              }}
            >
              <h3 style={{ margin: '0 0 8px', fontSize: 22 }}>Constant Updates</h3>
              <p style={{ margin: '0 0 16px', color: '#c7c8d9', fontWeight: 500 }}>
                The prices depend on what you want: weekly, bi-weekly, monthly, quarterly, yearly.
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 32 }}>$60-$250</span>
                <span style={{ color: '#c7c8d9', fontWeight: 600 }}>/website</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// noop: redeploy
