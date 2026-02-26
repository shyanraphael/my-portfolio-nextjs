import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import pfp from '../assets/shyan-pfp.png'
gsap.registerPlugin(ScrollTrigger);
const CONTACT_LINKS = [
{
  icon: GithubIcon,
  label: 'GitHub',
  handle: '@shyanraphael',
  href: 'https://github.com/shyanraphael',
  color: '#333'
},
{
  icon: LinkedinIcon,
  label: 'LinkedIn',
  handle: 'Shyan Wijesekera',
  href: 'https://www.linkedin.com/in/shyan-wijesekera',
  color: '#0077b5'
},
{
  icon: MailIcon,
  label: 'Email',
  handle: 'shyanraphael@gmail.com',
  href: 'mailto:shyanraphael@gmail.com',
  color: '#ea4335'
}];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = {
        trigger: sectionRef.current,
        start: 'top 75%'
      };
      gsap.fromTo(
        labelRef.current,
        {
          clipPath: 'inset(0 100% 0 0)',
          opacity: 0
        },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: st
        }
      );
      // Heading letter reveal
      const heading = headingRef.current;
      if (heading) {
        const lines = heading.querySelectorAll('.contact-line');
        lines.forEach((line, li) => {
          const text = line.textContent || '';
          line.innerHTML = text.
          split('').
          map(
            (c) =>
            `<span style="display:inline-block;overflow:hidden;"><span style="display:inline-block;">${c === ' ' ? '&nbsp;' : c}</span></span>`
          ).
          join('');
          const chars = line.querySelectorAll('span span');
          gsap.fromTo(
            chars,
            {
              y: '100%',
              opacity: 0
            },
            {
              y: '0%',
              opacity: 1,
              duration: 0.7,
              stagger: 0.025,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 80%'
              },
              delay: li * 0.1
            }
          );
        });
      }
      gsap.fromTo(
        subtextRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtextRef.current,
            start: 'top 85%'
          }
        }
      );
      // Links stagger
      const linkItems = linksRef.current?.querySelectorAll('.contact-link');
      if (linkItems) {
        gsap.fromTo(
          linkItems,
          {
            x: -40,
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: linksRef.current,
              start: 'top 85%'
            }
          }
        );
      }
      // Photo reveal
      gsap.fromTo(
        photoRef.current,
        {
          clipPath: 'inset(0 0 100% 0)',
          opacity: 0
        },
        {
          clipPath: 'inset(0 0 0% 0)',
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: photoRef.current,
            start: 'top 80%'
          }
        }
      );
      // Shape float
      gsap.to(shapeRef.current, {
        y: -40,
        rotation: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: 'var(--surface)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 100px)',
        position: 'relative',
        overflow: 'hidden'
      }}>

      {/* Large faded number */}
      <div
        className="section-num"
        style={{
          position: 'absolute',
          top: '40px',
          left: 'clamp(24px, 6vw, 100px)'
        }}>

        03
      </div>

      {/* Floating shape */}
      <div
        ref={shapeRef}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '1px solid var(--accent)',
          opacity: 0.08,
          pointerEvents: 'none'
        }} />


      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(40px, 6vw, 100px)',
          alignItems: 'center'
        }}>

        {/* Left: Content */}
        <div>
          <div
            ref={labelRef}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px',
              opacity: 0
            }}>

            <span
              style={{
                width: 24,
                height: 2,
                background: 'var(--accent)',
                display: 'inline-block',
                borderRadius: 2
              }} />

            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent)'
              }}>

              Get In Touch
            </span>
          </div>

          <h2
            ref={headingRef}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              lineHeight: 1.1,
              marginBottom: '24px'
            }}>

            <span
              className="contact-line"
              style={{
                display: 'block'
              }}>

              Let's Build
            </span>
            <span
              className="contact-line"
              style={{
                display: 'block',
                WebkitTextStroke: '1px var(--accent)',
                color: 'transparent'
              }}>

              Something Great
            </span>
          </h2>

          <p
            ref={subtextRef}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              fontWeight: 300,
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '44px',
              maxWidth: '420px',
              opacity: 0
            }}>

            Whether you have a project in mind, want to collaborate, or just
            want to say hello — my inbox is always open.
          </p>

          {/* Contact links */}
          <div
            ref={linksRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>

            {CONTACT_LINKS.map(({ icon: Icon, label, handle, href }) =>
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                cursor: 'none',
                opacity: 0,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  x: 6,
                  borderColor: 'var(--accent)',
                  duration: 0.25,
                  ease: 'power2.out'
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  x: 0,
                  borderColor: 'var(--border)',
                  duration: 0.25
                });
              }}>

                <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>

                  <Icon size={20} color="var(--accent)" />
                </div>
                <div>
                  <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginBottom: '2px'
                  }}>

                    {label}
                  </div>
                  <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'var(--text)'
                  }}>

                    {handle}
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Right: Photo */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>

          <div
            ref={photoRef}
            onMouseMove={(e)=> {
                const rect = e.currentTarget.getBoundingClientRect();
                // const centerX = rect.left + rect.width / 2;
                // const mouseX = e.clientX;
                const xRel = (e.clientX - rect.left) / rect.width - 0.5;
                const yRel = (e.clientY - rect.top) / rect.height - 0.5;

                const intensity = 40;
                const tilt = xRel * -70;

                gsap.to(photoRef.current, {
                    rotationY: xRel * -intensity,
                    rotationX: yRel * intensity,
                    transformPerspective: 800,
                    duration: 0.4,
                    ease: 'power2.out',
                    overwrite: true
                });
            }}
            onMouseLeave={()=>{
                gsap.to(photoRef.current, {
                    roatationX: 0,
                    rotationY: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.5)'
                });
            }}
          style={{
              position: 'relative',
              opacity: 0,
              transformStyle: 'preserve-3d',
          }}>

            {/* Photo frame */}
            <div
              style={{
                width: 'clamp(260px, 30vw, 380px)',
                height: 'clamp(320px, 38vw, 460px)',
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 30px 80px var(--shadow)'
              }}>

              <img
                src={pfp}
                alt="Profile photo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} />

              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                  'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4))'
                }} />

            </div>

            {/* Decorative border offset */}
            <div
              style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '24px',
                border: '1px solid var(--accent)',
                opacity: 0.2,
                pointerEvents: 'none',
                zIndex: -1
              }} />


            {/* Status badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '999px',
                backdropFilter: 'blur(12px)',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
                whiteSpace: 'nowrap'
              }}>

              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  display: 'inline-block',
                  boxShadow: '0 0 8px #22c55e',
                  animation: 'pulse 2s ease-in-out infinite'
                }} />

              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: '#fff',
                  fontWeight: 400
                }}>

                Available for work
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>);

}