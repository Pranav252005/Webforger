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
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%', 
      height: '100%'
    }}>
      <Aurora
        colorStops={["#54034d","#B19EEF","#5227FF"]}
        blend={0.5}
        amplitude={1.0}
        speed={1.4}
      />
      
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
            fontSize: '3rem',
            fontWeight: 'bold',
            fontFamily: 'Bookman Old Style, serif'
          }}
        >
          <h1>Contact Us</h1>
          <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
            Get in touch with our team
          </p>
        </div>
      )}

      {showContent && !stepperCompleted && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '600px',
          zIndex: 10,
          opacity: 0,
          animation: 'fadeIn 1s ease-in forwards'
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
        <>
          <div className="contact-info-left" style={{
            position: 'absolute',
            bottom: isMobile ? '0rem' : '2rem',
            left: isMobile ? '5rem' : '10rem',
            color: '#ffffff',
            zIndex: 10,
            fontFamily: "'Archivo Black', system-ui, sans-serif",
            opacity: 0,
            animation: 'fadeIn 1s ease-in forwards'
          }}>
            <div style={{
              fontSize: isMobile ? '0.65rem' : '1rem',
              marginBottom: '0.3rem',
              color: '#a78bfa'
            }}>
              Contact us at
            </div>
            <div style={{
              fontSize: isMobile ? '0.7rem' : '1.2rem',
              marginBottom: '0.2rem',
              letterSpacing: isMobile ? '0.5px' : '1px'
            }}>
              +1 (647) 963-1595
            </div>
            <div style={{
              fontSize: isMobile ? '0.7rem' : '1.2rem',
              letterSpacing: isMobile ? '0.5px' : '1px'
            }}>
              +91 897 133 8163
            </div>
          </div>

          <div className="contact-info-right" style={{
            position: 'absolute',
            bottom: isMobile ? '1rem' : '2rem',
            right: isMobile ? '-4rem' : '-6rem',
            color: '#ffffff',
            zIndex: 10,
            fontFamily: "'Archivo Black', system-ui, sans-serif",
            textAlign: 'right',
            opacity: 0,
            animation: 'fadeIn 1s ease-in forwards'
          }}>
            <div style={{
              fontSize: isMobile ? '0.65rem' : '1rem',
              marginBottom: '0.3rem',
              color: '#a78bfa'
            }}>
              Email at
            </div>
            <div style={{
              fontSize: isMobile ? '0.7rem' : '1.2rem',
              letterSpacing: isMobile ? '0.5px' : '1px',
              wordBreak: 'break-all'
            }}>
              webforgerhelp@gmail.com
            </div>
          </div>

          <div style={{
            position: 'absolute',
            bottom: '6rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            opacity: 0,
            animation: 'fadeInUp 1s ease-in forwards'
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
        </>
      )}

      {stepperCompleted && (
        <>
          <div style={{
            position: 'absolute',
            top: '50%',
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
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '2rem'
            }}>
              Thank You, {firstName}!
            </div>
          </div>
        </>
      )}

      {showMobileNotice && isMobile && (
        <div
          onClick={() => setShowMobileNotice(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998,
            backgroundColor: 'transparent'
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowMobileNotice(false);
            }}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '10rem',
              backgroundColor: 'rgba(139, 92, 246, 0.25)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              borderRadius: '16px',
              padding: '1rem 1.25rem',
              color: '#ffffff',
              fontFamily: "'Archivo Black', system-ui, sans-serif",
              fontSize: '0.85rem',
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.3)',
              animation: 'slideInFromRight 0.5s ease-out, glowPulse 2s ease-in-out infinite',
              cursor: 'pointer',
              maxWidth: '200px',
              textAlign: 'center',
              zIndex: 9999,
              transition: 'all 0.3s ease'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              fontWeight: 'bold',
              marginBottom: '0.25rem',
              color: '#e9d5ff'
            }}>
              💻 Best Viewed on Laptop
            </div>
            <div style={{
              fontSize: '0.7rem',
              color: '#c4b5fd',
              fontFamily: 'system-ui, sans-serif'
            }}>
              Tap to dismiss
            </div>
          </div>
        </div>
      )}

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
