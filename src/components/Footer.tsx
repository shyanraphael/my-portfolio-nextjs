import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpIcon } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big text parallax
      gsap.fromTo(
        bigTextRef.current,
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%'
          }
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <footer
      ref={footerRef}
      style={{
        background: 'var(--surface-2)',
        borderTop: '1px solid var(--border)',
        padding:
        'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 100px) clamp(32px, 4vw, 48px)',
        position: 'relative',
        overflow: 'hidden'
      }}>

      {/* Big background text */}
      <div
        ref={bigTextRef}
        style={{
          position: 'absolute',
          bottom: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(60px, 14vw, 160px)',
          fontWeight: 800,
          color: 'var(--text)',
          opacity: 0.03,
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.03em'
        }}>

        PORTFOLIO
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>

        {/* Top row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '32px',
            marginBottom: '60px'
          }}>

          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '28px',
                fontWeight: 800,
                color: 'var(--text)',
                letterSpacing: '-0.02em',
                marginBottom: '12px'
              }}>

              Raphael
              <span
                style={{
                  color: 'var(--accent)'
                }}>

                .
              </span>
            </div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: 'var(--text-muted)',
                maxWidth: '260px',
                lineHeight: 1.6
              }}>

              Building digital experiences with passion and precision.
            </p>
          </div>

          {/* Nav links */}
          <div
            style={{
              display: 'flex',
              gap: 'clamp(24px, 4vw, 60px)',
              flexWrap: 'wrap'
            }}>

            <div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '16px'
                }}>

                Navigation
              </div>
              {['Home', 'About', 'Projects', 'Contact'].map((item) =>
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.
                  getElementById(item.toLowerCase())?.
                  scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
                style={{
                  display: 'block',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  marginBottom: '10px',
                  cursor: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--text-muted)';
                }}>

                  {item}
                </a>
              )}
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '16px'
                }}>

                Connect
              </div>
              {['GitHub', 'LinkedIn', 'Email'].map((item) =>
              <a
                key={item}
                href="#"
                style={{
                  display: 'block',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  marginBottom: '10px',
                  cursor: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.color =
                  'var(--text-muted)';
                }}>

                  {item}
                </a>
              )}
            </div>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '999px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'none',
              transition: 'all 0.3s ease',
              alignSelf: 'flex-start'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                y: -3,
                borderColor: 'var(--accent)',
                duration: 0.25
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                y: 0,
                borderColor: 'var(--border)',
                duration: 0.25
              });
            }}>

            <ArrowUpIcon size={14} />
            Back to top
          </button>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'var(--border)',
            marginBottom: '28px'
          }} />


        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>

            © {new Date().getFullYear()} Shyan Raphael Wijesekera. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>

            Built with NextJS, React, GSAP & Lenis
          </p>
        </div>
      </div>
    </footer>);

}