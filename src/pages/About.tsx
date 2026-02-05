import React, { useMemo, useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import GradientBlinds from '../components/GradientBlinds';
import SplitText from '../components/SplitText';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const [lineVisible, setLineVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [overlayStage, setOverlayStage] = useState<'closed' | 'confirm' | 'expanded'>('closed');
  const [selectedChoice, setSelectedChoice] = useState<'yes' | 'no'>('no');
  const heroTopPosition = '70%'; // adjust this value to move the SplitText block vertically
  const introBlockOffset = '-333px'; // adjust this value (e.g., '-40px' or '-120px') to move the intro text + button up/down
  const gradientColors = useMemo(() => ['#FF9FFC', '#5227FF'], []);
  const animatedTexts = useMemo(
    () => [
      'Webforger builds websites that stay out of the way so your work can speak.',
      'Structure first. Motion only when it serves clarity. Delivery without theatrics.',
      'We aren’t here to swallow up your time. We’re here to help you build your business. Soo go on go build your business while we do this for you.'
    ],
    []
  );
  const renderAnimatedText = (text: string, key: string, index: number) => {
    const totalDuration = 20; // seconds
    const startDelay = 2; // seconds before first line starts
    const lines = animatedTexts.length || 1;
    const lineDuration = (totalDuration - startDelay) / lines; // spread evenly
    const delay = startDelay + index * lineDuration;
    return (
      <p
        key={key}
        style={{
          margin: key === 'p1' ? 0 : key === 'p2' ? '12px 0 0' : '14px 0 0',
          opacity: 0,
          filter: 'blur(10px)',
          animation: `fadeBlurLine ${lineDuration}s ease forwards`,
          animationDelay: `${delay}s`
        }}
      >
        {text}
      </p>
    );
  };
  const handleAnimationComplete = () => {
    // Defer visibility to next frame to avoid blocking during the text animation end
    requestAnimationFrame(() => setLineVisible(true));
    console.log('All letters have animated!');
  };

  useEffect(() => {
    const t = setTimeout(() => setCtaVisible(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (overlayStage === 'confirm') {
      setSelectedChoice('no');
    }
  }, [overlayStage]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (overlayStage !== 'closed') {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [overlayStage]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && overlayStage !== 'closed') {
        setOverlayStage('closed');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [overlayStage]);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <GradientBlinds
        className="about-gradient-blinds"
        gradientColors={gradientColors}
        angle={0}
        noise={0}
        blindCount={10}
        blindMinWidth={60}
        spotlightRadius={0.45}
        spotlightSoftness={0.2}
        spotlightOpacity={0.9}
        mouseDampening={0.05}
        distortAmount={0}
        shineDirection="left"
        mixBlendMode="lighten"
      />
      <div
        className="about-hero-wrapper"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: heroTopPosition,
            transform: 'translateX(-50%)',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        >
          <div
            className="about-hero-text"
            style={{
              color: 'white',
              fontFamily: "'Archivo Black', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
              marginLeft: 0,
              height: '50%'
            }}
          >
            <SplitText
              text={`Build Fast.
Build Clean.
Build with Intent.
That's Webforger.`}
              className="text-4xl leading-tight text-center"
              delay={60}
              duration={1.35}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              paddingLeft="0px"
              onLetterAnimationComplete={handleAnimationComplete}
              showCallback
              tag="h1"
            />
            <div
              className="about-hero-line"
              style={{
                margin: '-22px auto 0',
                marginRight: '40px',
                height: '2px',
                background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 1), transparent)',
                opacity: lineVisible ? 1 : 0,
                transition: 'opacity 0.2s ease-out 0.2s',
                willChange: 'opacity'
              }}
            />
          </div>
        </div>
      </div>
      {/* Content Sections Below SplitText */}
      <div
        className="about-content-sections"
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 20px',
          gap: 32,
          overflow: 'hidden',
          height: '100vh',
          boxSizing: 'border-box'
        }}
      >
        <style>{`
          .about-overlay-body::-webkit-scrollbar { display: none; }
          .about-overlay-body { scrollbar-width: none; }
          @keyframes fadeBlurLine {
            0% { opacity: 0; filter: blur(10px); }
            30% { opacity: 0.6; filter: blur(6px); }
            100% { opacity: 1; filter: blur(0); }
          }
        `}</style>

        <div
          style={{
            maxWidth: 840,
            textAlign: 'center',
            color: '#e9e6ff',
            fontFamily: "'Archivo Black', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
            lineHeight: 1.6,
            fontWeight: 200,
            letterSpacing: '0.01em',
            opacity: 0.94,
            transition: 'opacity 2s ease',
            transform: `translateY(${introBlockOffset})`
          }}
        >
          {animatedTexts.map((t, idx) => renderAnimatedText(t, `p${idx + 1}`, idx))}
        </div>

        <div style={{ height: 36 }} />

        <button
          onClick={(e) => {
            e.preventDefault();
            if (!ctaVisible) return;
            setOverlayStage('confirm');
          }}
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? `translateY(calc(${introBlockOffset} - 60px))` : `translateY(calc(${introBlockOffset} + 80px))`,
            transition: 'opacity 3s ease, transform 3s ease',
            transitionDelay: ctaVisible ? '17s' : '0s',
            pointerEvents: ctaVisible ? 'auto' : 'none',
            background: 'rgba(40, 40, 40, 0.56)',
            color: '#eae8ff',
            border: '1px solid rgba(255, 255, 255, 0)',
            borderRadius: 999,
            padding: '12px 36px',
            fontSize: 15,
            letterSpacing: '0.02em',
            cursor: 'pointer',
            outline: 'none',
            transitionProperty: 'opacity, transform, background, border'
          }}
        >
          Continue reading
        </button>

        {overlayStage !== 'closed' && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: overlayStage === 'expanded' ? 'rgba(10, 8, 20, 0.78)' : 'rgba(10, 8, 20, 0.62)',
              backdropFilter: 'blur(12px)',
              transition: 'opacity 0.35s ease',
              opacity: overlayStage === 'closed' ? 0 : 1,
              pointerEvents: overlayStage === 'closed' ? 'none' : 'auto'
            }}
            onClick={() => setOverlayStage('closed')}
          >
            <button
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                setOverlayStage('closed');
              }}
              style={{
                position: 'absolute',
                top: 38,
                right: 18,
                padding: '8px 12px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.06)',
                color: '#eae8ff',
                fontSize: 13,
                letterSpacing: '0.02em',
                cursor: 'pointer',
                fontFamily: "'Archivo Black', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
              }}
            >
              Esc
            </button>
            {overlayStage === 'confirm' && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: 'min(480px, 90vw)',
                  background: 'rgba(12,10,26,0.9)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  padding: '28px 24px',
                  textAlign: 'center',
                  color: '#e8e7f5',
                  fontFamily: "'Archivo Black', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
                  letterSpacing: '0.01em',
                  lineHeight: 1.3,
                  boxShadow: '0 18px 60px rgba(0,0,0,0.55)',
                  transform: 'translateY(0)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease'
                }}
              >
                <p style={{ margin: '0 0 18px', fontSize: 22 }}>Are you sure?</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      setSelectedChoice('yes');
                      setOverlayStage('expanded');
                    }}
                    style={{
                      minWidth: 96,
                      padding: '10px 14px',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: selectedChoice === 'yes' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                      color: '#e8e7f5',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      letterSpacing: '0.01em'
                    }}
                  >
                    Yes
                  </button>
                  <button
                    autoFocus
                    onClick={() => {
                      setSelectedChoice('no');
                      setOverlayStage('closed');
                    }}
                    style={{
                      minWidth: 96,
                      padding: '10px 14px',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.3)',
                      background: selectedChoice === 'no' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
                      color: '#e8e7f5',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      letterSpacing: '0.01em'
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {overlayStage === 'expanded' && (
              <div
                className="about-overlay-body"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: 'min(960px, 94vw)',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  padding: '32px 28px',
                  background: 'rgba(14,12,26,0.92)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 18,
                  boxShadow: '0 18px 60px rgba(0,0,0,0.55)',
                  color: '#d9d7eb',
                  fontFamily: "'Archivo Black', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
                  lineHeight: 1.35,
                  letterSpacing: '0.003em',
                  transition: 'max-height 0.9s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 10px', fontSize: 22 }}>About Webforger</h3>
                  <p style={{ margin: 0 }}>
                    Webforger is a small, focused web development studio built to design and engineer websites that work without demanding attention.
                  </p>
                  <p style={{ margin: '10px 0 0' }}>
                    We design and develop modern websites with an emphasis on structure, performance, clarity, and long-term maintainability. Our work prioritizes usability, responsiveness, and clean system architecture over trends or short-lived visual effects.
                  </p>
                  <p style={{ margin: '10px 0 0' }}>We work with businesses that need a reliable digital presence, not constant redesigns.</p>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 10px', fontSize: 20 }}>What We Actually Do</h3>
                  <ul style={{ margin: 0, paddingLeft: 18, listStyle: 'disc' }}>
                    <li>Website design and development</li>
                    <li>Frontend engineering with modern frameworks</li>
                    <li>Performance optimization and asset efficiency</li>
                    <li>Responsive layouts across devices</li>
                    <li>Structured content systems for scalability</li>
                    <li>Clean animations where they add meaning</li>
                    <li>Integration with third-party tools when required</li>
                  </ul>
                  <p style={{ margin: '10px 0 0' }}>Nothing more than necessary. Nothing less than functional.</p>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 10px', fontSize: 20 }}>How We Work</h3>
                  <p style={{ margin: '0 0 10px' }}>We operate with a simple process:</p>
                  <ul style={{ margin: 0, paddingLeft: 18, listStyle: 'disc' }}>
                    <li>Understand the business objective</li>
                    <li>Define structure before visuals</li>
                    <li>Build systems, not pages</li>
                    <li>Ship stable, testable output</li>
                    <li>Minimize future dependency</li>
                  </ul>
                  <p style={{ margin: '10px 0 0' }}>We avoid bloated stacks, unnecessary plugins, and fragile setups.</p>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 10px', fontSize: 20 }}>What We Don’t Do</h3>
                  <ul style={{ margin: 0, paddingLeft: 18, listStyle: 'disc' }}>
                    <li>No inflated promises</li>
                    <li>No fake timelines</li>
                    <li>No vanity features</li>
                    <li>No unnecessary retainers</li>
                  </ul>
                  <p style={{ margin: '10px 0 0' }}>If something doesn’t add value, it doesn’t go in.</p>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 10px', fontSize: 20 }}>Who This Is For</h3>
                  <p style={{ margin: '0 0 10px' }}>Webforger is for founders, teams, and operators who want their website to:</p>
                  <ul style={{ margin: 0, paddingLeft: 18, listStyle: 'disc' }}>
                    <li>Load fast</li>
                    <li>Stay stable</li>
                    <li>Scale without friction</li>
                    <li>Require minimal intervention</li>
                  </ul>
                  <p style={{ margin: '10px 0 0' }}>
                    If you need constant attention, frequent redesigns, or excessive motion, this may not be the right fit.
                  </p>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 10px', fontSize: 20 }}>Why This Exists</h3>
                  <p style={{ margin: 0 }}>Most businesses don’t need complexity.</p>
                  <p style={{ margin: '6px 0 0' }}>They need something that works quietly in the background.</p>
                  <p style={{ margin: '10px 0 0' }}>That’s what we build.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default About;

// noop: redeploy
