import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const SKILLS = [
'React',
'TypeScript',
'Node.js',
'Python',
'GSAP',
'Three.js',
'PostgreSQL',
'Docker'];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const sectionNumRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section number fade in
      gsap.fromTo(
        sectionNumRef.current,
        {
          opacity: 0,
          x: -40
        },
        {
          opacity: 0.04,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      );
      // Label
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
          scrollTrigger: {
            trigger: labelRef.current,
            start: 'top 85%'
          }
        }
      );
      // Heading word-by-word
      const heading = headingRef.current;
      if (heading) {
        const words = heading.textContent?.split(' ') || [];
        heading.innerHTML = words.
        map(
          (w) =>
          `<span class="overflow-clip" style="display:inline-block;overflow:hidden;"><span style="display:inline-block;">${w}</span></span>`
        ).
        join(' ');
        const wordSpans = heading.querySelectorAll('span span');
        gsap.fromTo(
          wordSpans,
          {
            y: '100%',
            opacity: 0
          },
          {
            y: '0%',
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%'
            }
          }
        );
      }
      // Paragraphs line reveal
      ;[para1Ref.current, para2Ref.current].forEach((para, i) => {
        if (!para) return;
        gsap.fromTo(
          para,
          {
            clipPath: 'inset(0 0 100% 0)',
            y: 20,
            opacity: 0
          },
          {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: para,
              start: 'top 88%'
            },
            delay: i * 0.15
          }
        );
      });
      // Skills stagger pop
      const skillItems = skillsRef.current?.querySelectorAll('.skill-item');
      if (skillItems) {
        gsap.fromTo(
          skillItems,
          {
            scale: 0.6,
            opacity: 0,
            y: 20
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 85%'
            }
          }
        );
      }
      // Decorative parallax
      gsap.to(decorRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        padding: 'clamp(80px, 12vw, 160px) clamp(24px, 6vw, 100px)',
        position: 'relative',
        overflow: 'hidden'
      }}>

      {/* Large faded section number */}
      <div
        ref={sectionNumRef}
        className="section-num"
        style={{
          position: 'absolute',
          top: '40px',
          left: 'clamp(24px, 6vw, 100px)',
          opacity: 0
        }}>

        01
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(40px, 6vw, 100px)',
          alignItems: 'center'
        }}>

        {/* Left: Text content */}
        <div>
          {/* Label */}
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

              About Me
            </span>
          </div>

          {/* Heading */}
          <h2
            ref={headingRef}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: '28px'
            }}>

            Passionate about building things that matter
          </h2>

          {/* Paragraphs */}
          <p
            ref={para1Ref}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(15px, 1.5vw, 17px)',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              marginBottom: '20px',
              opacity: 0
            }}>

            I am a full-stack developer with 2+ years of experience crafting
            digital experiences. I specialize in React, Node.js, and modern web
            technologies. When I am not coding, I am exploring new design
            trends, contributing to open source, or experimenting with creative
            coding.
          </p>

          <p
            ref={para2Ref}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(15px, 1.5vw, 17px)',
              fontWeight: 300,
              lineHeight: 1.8,
              color: 'var(--text-muted)',
              marginBottom: '40px',
              opacity: 0
            }}>

            My approach combines technical precision with creative thinking — I
            believe great software is both functional and beautiful.
          </p>

          {/* Skills */}
          <div
            ref={skillsRef}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px'
            }}>

            {SKILLS.map((skill) =>
            <span
              key={skill}
              className="skill-item lang-tag"
              style={{
                opacity: 0
              }}>

                {skill}
              </span>
            )}
          </div>
        </div>

        {/* Right: Decorative */}
        <div
          ref={decorRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            height: '400px'
          }}>

          {/* Outer ring */}
          <div
            style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              border: '1px solid var(--border)'
            }} />

          {/* Middle ring */}
          <div
            style={{
              position: 'absolute',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              border: '1px dashed var(--accent)',
              opacity: 0.3,
              animation: 'spin 20s linear infinite'
            }} />

          {/* Inner filled */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: `radial-gradient(circle at 40% 40%, var(--accent), var(--accent-2))`,
              opacity: 0.15,
              position: 'absolute'
            }} />

          {/* Center text */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center'
            }}>

            <div
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '48px',
                fontWeight: 800,
                color: 'var(--accent)',
                lineHeight: 1
              }}>

              2+
            </div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                marginTop: '4px'
              }}>

              Years of Experience
            </div>
          </div>

          {/* Orbiting dots */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) =>
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--accent)',
              opacity: 0.4 + i * 0.1,
              transform: `rotate(${deg}deg) translateX(160px)`
            }} />

          )}
        </div>
      </div>
    </section>);

}