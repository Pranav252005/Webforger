import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Aurora from '../Aurora';
import Stepper, { Step } from '../components/Stepper';

export default function Contact() {
  const [showContent, setShowContent] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [companyNameError, setCompanyNameError] = useState(false);
  
  const [stepperCompleted, setStepperCompleted] = useState(false);
  const [showMobileNotice, setShowMobileNotice] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setTimeout(() => {
          setShowMobileNotice(true);
        }, 2500);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setTimeout(() => {
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: '100vw',
          filter: 'blur(20px)',
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => {
            setShowContent(true);
          }
        });
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (showMobileNotice) {
      const dismissTimer = setTimeout(() => {
        setShowMobileNotice(false);
      }, 5000);
      return () => clearTimeout(dismissTimer);
    }
  }, [showMobileNotice]);

  const validateStep1 = () => {
    let isValid = true;
    if (!firstName.trim()) {
      setFirstNameError(true);
      isValid = false;
    } else {
      setFirstNameError(false);
    }
    if (!lastName.trim()) {
      setLastNameError(true);
      isValid = false;
    } else {
      setLastNameError(false);
    }
    return isValid;
  };

  const validateStep2 = () => {
    let isValid = true;
    if (!companyName.trim()) {
      setCompanyNameError(true);
      isValid = false;
    } else {
      setCompanyNameError(false);
    }
    return isValid;
  };

  const handleBeforeStepChange = (currentStep: number, nextStep: number) => {
    if (currentStep === 1 && nextStep > currentStep) {
      return validateStep1();
    } else if (currentStep === 2 && nextStep > currentStep) {
      return validateStep2();
    }
    return true;
  };

  const handlePayment = () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID',
      amount: 50000,
      currency: 'INR',
      name: 'Webforger',
      description: 'Service Payment',
      image: '/Webforger.png',
      handler: function (response: any) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        console.log('Form Data:', { firstName, lastName, companyName, email, message });
      },
      prefill: {
        name: `${firstName} ${lastName}`,
        email: email,
        contact: ''
      },
      theme: {
        color: '#8b5cf6'
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ 
      position: 'relative',
      width: '100%', 
      minHeight: '100vh',
      backgroundColor: '#000',
      overflowX: 'hidden',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Aurora
          colorStops={["#54034d","#B19EEF","#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={1.4}
        />
      </div>
      
      {!showContent && (
        <div 
          ref={titleRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#ffffff',
            zIndex: 10,
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            width: '90%',
            fontWeight: 'bold',
            fontFamily: 'Bookman Old Style, serif'
          }}
        >
          <h1>Contact Us</h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', marginTop: '1rem' }}>
            Get in touch with our team
          </p>
        </div>
      )}

      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 'clamp(80px, 15vh, 120px) 5vw 40px',
        boxSizing: 'border-box',
        width: '100%',
        minHeight: '100vh',
        maxWidth: '100vw'
      }}>
        {showContent && !stepperCompleted && (
          <div style={{
            width: '100%',
            maxWidth: '500px',
            opacity: 0,
            animation: 'fadeIn 1s ease-in forwards',
            marginBottom: '2rem',
            boxSizing: 'border-box'
          }}>
            <Stepper
              initialStep={1}
            onBeforeStepChange={handleBeforeStepChange}
            onFinalStepCompleted={() => setStepperCompleted(true)}
            backButtonText="Previous"
            nextButtonText="Next"
          >
            <Step>
              <div style={{
                color: '#ffffff',
                fontFamily: "'Archivo Black', system-ui, sans-serif"
              }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Personal Information</h2>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (e.target.value.trim()) setFirstNameError(false);
                    }}
                    placeholder="Enter your first name"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: firstNameError ? '2px solid #ef4444' : '1px solid #52525b',
                      backgroundColor: firstNameError ? '#fee2e2' : '#18181b',
                      color: firstNameError ? '#991b1b' : '#ffffff',
                      outline: 'none'
                    }}
                  />
                  {firstNameError && (
                    <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>First name is required</p>
                  )}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (e.target.value.trim()) setLastNameError(false);
                    }}
                    placeholder="Enter your last name"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: lastNameError ? '2px solid #ef4444' : '1px solid #52525b',
                      backgroundColor: lastNameError ? '#fee2e2' : '#18181b',
                      color: lastNameError ? '#991b1b' : '#ffffff',
                      outline: 'none'
                    }}
                  />
                  {lastNameError && (
                    <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>Last name is required</p>
                  )}
                </div>
              </div>
            </Step>
            <Step>
              <div style={{
                color: '#ffffff',
                fontFamily: "'Archivo Black', system-ui, sans-serif"
              }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Company Details</h2>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Company Name *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      if (e.target.value.trim()) setCompanyNameError(false);
                    }}
                    placeholder="Enter your company name"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: companyNameError ? '2px solid #ef4444' : '1px solid #52525b',
                      backgroundColor: companyNameError ? '#fee2e2' : '#18181b',
                      color: companyNameError ? '#991b1b' : '#ffffff',
                      outline: 'none'
                    }}
                  />
                  {companyNameError && (
                    <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>Company name is required</p>
                  )}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: '1px solid #52525b',
                      backgroundColor: '#18181b',
                      color: '#ffffff',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </Step>
            <Step>
              <div style={{
                color: '#ffffff',
                fontFamily: "'Archivo Black', system-ui, sans-serif"
              }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Additional Message</h2>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Message (Optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Send us a message directly to webforgerhelp@gmail.com"
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: '1px solid #52525b',
                      backgroundColor: '#18181b',
                      color: '#ffffff',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'system-ui, sans-serif'
                    }}
                  />
                </div>
                <p style={{ fontSize: '0.85rem', color: '#a78bfa', marginTop: '1rem' }}>
                  Your message will be sent to webforgerhelp@gmail.com
                </p>
              </div>
            </Step>
          </Stepper>
        </div>
      )}

      {showContent && (
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '800px',
          gap: isMobile ? '2rem' : '4rem',
          marginTop: stepperCompleted ? '0' : '2rem',
          zIndex: 10,
          opacity: 0,
          animation: 'fadeIn 1s ease-in forwards'
        }}>
          <div className="contact-info-left" style={{
            color: '#ffffff',
            fontFamily: "'Archivo Black', system-ui, sans-serif",
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: isMobile ? '0.85rem' : '1rem',
              marginBottom: '0.3rem',
              color: '#a78bfa'
            }}>
              Contact us at
            </div>
            <div style={{
              fontSize: isMobile ? '0.9rem' : '1.2rem',
              letterSpacing: isMobile ? '0.5px' : '1px'
            }}>
              +91 89713 38163
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            order: isMobile ? 3 : 2
          }}>
            <button
              onClick={handlePayment}
              disabled={!stepperCompleted}
              style={{
                padding: '16px 48px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                fontFamily: "'Archivo Black', system-ui, sans-serif",
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                borderRadius: '12px',
                cursor: stepperCompleted ? 'pointer' : 'not-allowed',
                boxShadow: '0 8px 24px rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                opacity: stepperCompleted ? 1 : 0.55
              }}
              onMouseEnter={(e) => {
                if (!stepperCompleted) return;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 255, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                if (!stepperCompleted) return;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 0.3)';
              }}
            >
              Make Payment
            </button>
          </div>

          <div className="contact-info-right" style={{
            color: '#ffffff',
            fontFamily: "'Archivo Black', system-ui, sans-serif",
            textAlign: 'center',
            order: isMobile ? 2 : 3
          }}>
            <div style={{
              fontSize: isMobile ? '0.85rem' : '1rem',
              marginBottom: '0.3rem',
              color: '#a78bfa'
            }}>
              Email at
            </div>
            <div style={{
              fontSize: isMobile ? '0.9rem' : '1.2rem',
              letterSpacing: isMobile ? '0.5px' : '1px',
              wordBreak: 'break-all'
            }}>
              webforgerhelp@gmail.com
            </div>
          </div>
        </div>
      )}

      {stepperCompleted && (
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#ffffff',
          zIndex: 10,
          fontFamily: "'Archivo Black', system-ui, sans-serif",
          opacity: 0,
          animation: 'fadeIn 1s ease-in forwards'
        }}>
          <div style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: 'bold',
            marginBottom: '2rem'
          }}>
            Thank You, {firstName}!
          </div>
        </div>
      )}

      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.5);
          }
        }
      `}</style>
    </div>
  );
}

// noop: redeploy
