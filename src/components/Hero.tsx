import React, { useEffect, useRef, createElement } from 'react';
import { gsap } from 'gsap';
import { ArrowDownIcon } from 'lucide-react';
interface HeroProps {
  theme: string;
}
export function Hero({ theme }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out'
        }
      });
      // Eyebrow slide in
      tl.fromTo(
        eyebrowRef.current,
        {
          clipPath: 'inset(0 100% 0 0)',
          opacity: 0,
          x: -20
        },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          x: 0,
          duration: 0.8
        },
        0.2
      );
      // Letter-by-letter heading reveal
      const heading = headingRef.current;
      if (heading) {
        const lines = heading.querySelectorAll('.hero-line');
        lines.forEach((line, lineIdx) => {
          const text = line.textContent || '';
          line.innerHTML = '';
          text.split('').forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.overflow = 'hidden';
            const inner = document.createElement('span');
            inner.textContent = span.textContent;
            inner.style.display = 'inline-block';
            span.innerHTML = '';
            span.appendChild(inner);
            line.appendChild(span);
          });
          const chars = line.querySelectorAll('span span');
          tl.fromTo(
            chars,
            {
              y: 80,
              opacity: 0,
              rotationX: -90
            },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              duration: 0.7,
              stagger: 0.025,
              ease: 'back.out(1.5)'
            },
            0.4 + lineIdx * 0.15
          );
        });
      }
      // Subtext fade up
      tl.fromTo(
        subtextRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8
        },
        1.0
      );
      // CTAs stagger
      tl.fromTo(
        ctaRef.current?.children ?? [],
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12
        },
        1.2
      );
      // Scroll indicator bounce
      tl.fromTo(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: -10
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5
        },
        1.6
      );
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
      });
      // Floating shapes
      const shapes = shapesRef.current?.querySelectorAll('.shape');
      shapes?.forEach((shape, i) => {
        const amplitude = 15 + i * 8;
        const speed = 3 + i * 0.7;
        const offset = i * 1.2;
        gsap.to(shape, {
          y: `+=${amplitude}`,
          x: `+=${amplitude * 0.4}`,
          rotation: `+=${10 + i * 5}`,
          duration: speed,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: offset
        });
      });
      // Mouse parallax on grid
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPct = (clientX / window.innerWidth - 0.5) * 20;
        const yPct = (clientY / window.innerHeight - 0.5) * 20;
        gsap.to(gridRef.current, {
          x: xPct,
          y: yPct,
          duration: 1.5,
          ease: 'power2.out'
        });
      };
      window.addEventListener('mousemove', onMouseMove);
      return () => window.removeEventListener('mousemove', onMouseMove);
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  const handleViewWork = () => {
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return (
    <section
      id="home"
      ref={sectionRef}
      className="grid-bg noise"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)'
      }}>

      {/* Grid layer */}
      <div
        ref={gridRef}
        style={{
          position: 'absolute',
          inset: '-10%',
          backgroundImage: `linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none'
        }} />


      {/* Floating shapes */}
      <div
        ref={shapesRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none'
        }}>

        {/* Large circle ring */}
        <div
          className="shape"
          style={{
            position: 'absolute',
            top: '15%',
            right: '8%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: `2px solid var(--accent)`,
            opacity: 0.15
          }} />

        {/* Small filled circle */}
        <div
          className="shape"
          style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0.12
          }} />

        {/* Rotated square */}
        <div
          className="shape"
          style={{
            position: 'absolute',
            top: '25%',
            left: '5%',
            width: 80,
            height: 80,
            border: `2px solid var(--accent-2)`,
            opacity: 0.15,
            transform: 'rotate(45deg)'
          }} />

        {/* Triangle SVG */}
        <svg
          className="shape"
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            opacity: 0.1
          }}
          width="100"
          height="100"
          viewBox="0 0 100 100">

          <polygon
            points="50,10 90,90 10,90"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2" />

        </svg>
        {/* Dotted circle */}
        <svg
          className="shape"
          style={{
            position: 'absolute',
            top: '70%',
            right: '5%',
            opacity: 0.08
          }}
          width="150"
          height="150"
          viewBox="0 0 150 150">

          <circle
            cx="75"
            cy="75"
            r="60"
            fill="none"
            stroke="var(--accent-2)"
            strokeWidth="1.5"
            strokeDasharray="6 6" />

        </svg>
        {/* Small accent dot */}
        <div
          className="shape"
          style={{
            position: 'absolute',
            top: '40%',
            left: '18%',
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: 'var(--accent)',
            opacity: 0.4
          }} />

      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '900px',
          width: '100%',
          padding: '0 24px',
          textAlign: 'center'
        }}>

        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '28px',
            opacity: 0
          }}>

          <span
            style={{
              display: 'inline-block',
              width: 32,
              height: 2,
              background: 'var(--accent)',
              borderRadius: 2
            }} />

          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent)'
            }}>

            Full Stack Developer
          </span>
          <span
            style={{
              display: 'inline-block',
              width: 32,
              height: 2,
              background: 'var(--accent)',
              borderRadius: 2
            }} />

        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(52px, 9vw, 120px)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: 'var(--text)',
            marginBottom: '28px',
            perspective: '800px'
          }}>

          <span
            className="hero-line"
            style={{
              display: 'block'
            }}>

            Crafting Digital
          </span>
          <span
            className="hero-line"
            style={{
              display: 'block',
              WebkitTextStroke: '1px var(--accent)',
              color: 'transparent'
            }}>

            Experiences
          </span>
        </h1>

        {/* Subtext */}
        <p
          ref={subtextRef}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            maxWidth: '560px',
            margin: '0 auto 44px',
            opacity: 0
          }}>

          A passionate 2nd year undergaduate student pursuing the degree in BCs speciaizing in full-stack web development.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>

          <button
            onClick={handleViewWork}
            style={{
              padding: '14px 36px',
              borderRadius: '999px',
              background: 'var(--accent)',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              fontWeight: 500,
              border: 'none',
              cursor: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 30px rgba(167,139,250,0.3)',
              opacity: 0
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                boxShadow: '0 0 40px rgba(167,139,250,0.5)',
                duration: 0.25
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                boxShadow: '0 0 30px rgba(167,139,250,0.3)',
                duration: 0.25
              });
            }}>

            View My Work
          </button>
          <button
            onClick={handleContact}
            style={{
              padding: '14px 36px',
              borderRadius: '999px',
              background: 'transparent',
              color: 'var(--text)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              fontWeight: 500,
              border: '1px solid var(--border)',
              cursor: 'none',
              transition: 'all 0.3s ease',
              opacity: 0,
              backdropFilter: 'blur(8px)'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                borderColor: 'var(--accent)',
                duration: 0.25
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                borderColor: 'var(--border)',
                duration: 0.25
              });
            }}>

            Get In Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0,
          cursor: 'none'
        }}
        onClick={() =>
        document.getElementById('about')?.scrollIntoView({
          behavior: 'smooth'
        })
        }>

        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)'
          }}>

          Scroll
        </span>
        <ArrowDownIcon size={16} color="var(--text-muted)" />
      </div>
    </section>);

}