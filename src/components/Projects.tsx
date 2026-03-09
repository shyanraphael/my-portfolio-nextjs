import { useEffect, useRef, lazy } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRightIcon } from 'lucide-react';
import portNext from '../assets/port-next.png';
import portHTML from '../assets/port-html.png';

gsap.registerPlugin(ScrollTrigger);
interface Project {
  num: string;
  title: string;
  image: string;
  langs: string[];
  desc: string;
  proLink: string,
}
const PROJECTS: Project[] = [
{
    num: '01',
    title: 'Portfolio Website - NextJS',
    image: portNext,
    langs: ['React', 'Next.js', 'Gsap', 'Lenis', 'Typescript'],
    desc: 'Portfolio website to showcase my web-development skills in React and Next.js.',
    proLink:'https://github.com/shyanraphael/my-portfolio-nextjs',
},
{
    num: '02',
    title: 'Portfolio Website - HTML',
    image: portHTML,
    langs: ['HTML', 'CSS', 'Javascript', 'Gsap', 'Lenis'],
    desc: 'Portfolio website to showcase my web-development skills in HTML and CSS',
    proLink:'https://github.com/shyanraphael/my-portfolio',
},
{
    num: '03',
    title: 'Sri Maps',
     image: srimapsFinal,
    langs: ['Next.js', 'Tailwind', 'Typescript', 'Vite', 'Gsap'],
    desc: 'Real-time live bus location tracking application providing the ability to switch between languages Sinhalese, English and Tamil',
    proLink:'https://github.com/srimaps/srimaps-final',
},
{
    num: '04',
    title: 'Sri Maps - Marketing Page',
    image:srimapsMarket,
    langs: ['Next.js', 'Tailwind', 'Typescript', 'Vite', 'Gsap'],
    desc: 'Marketing website for the official Sri Maps website with no language barrier giving the opportunity to switch between Sinhalese, English and Tamil',
    proLink:'https://github.com/shyanraphael/srimaps-landingPage',
},
{
    num: '05',
    title: 'Merchy - Next.js',
    image:merchyNext,
    langs: ['HTML', 'CSS', 'Javascript', 'Gsap', 'Lenis'],
    desc: 'Clothing website for women made using HTML and CSS',
    proLink:'',
},
{
    num: '06',
    title: 'Merchy - HTML',
    image:merchyHTML,
    langs: ['Next.js', 'Tailwind', 'Typescript', 'Vite', 'Gsap', 'Lenis'],
    desc: 'Clothing website for women made using a girlish theme',
    proLink:'https://github.com/shyanraphael/merchy-frontend',
},
{
    num: '07',
    title: 'Sri Maps - Prototype',
    image: sriPro,
    langs: ['Figma'],
    desc: 'Prototype application made for Sri Maps website',
    proLink:'https://www.figma.com/design/Dc4ZgxqcsEIjC68d4a7VWs/SriMaps-Prototype?t=fSZxpRsI56ef0O00-0',
},
{
    num: '08',
    title: 'Inventory Management',
    image:
        'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80',
    langs: ['Next.js', 'CSS', 'Typescript'],
    desc: 'Inventory Management System website with functioning login/sign-up page',
    proLink:'https://github.com/shyanraphael/inventory-app',
}];

function ProjectCard({ project, index }: {project: Project;index: number;}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 1;
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          once: true
        }
      });
      // Image clip-in from side
      tl.fromTo(
        imageRef.current,
        {
          clipPath: isEven ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
          opacity: 0
        },
        {
          clipPath: 'inset(0 0% 0 0%)',
          opacity: 1,
          duration: 1,
          ease: 'power3.out'
        },
        0
      );
      // Number fade in
      tl.fromTo(
        numRef.current,
        {
          opacity: 0,
          x: isEven ? 30 : -30
        },
        {
          opacity: 0.06,
          x: 0,
          duration: 0.8,
          ease: 'power3.out'
        },
        0.1
      );
      // Title letter stagger
      const heading = titleRef.current;
      if (heading) {
        const text = heading.textContent || '';
        heading.innerHTML = text.
        split('').
        map(
          (c) =>
          `<span style="display:inline-block;overflow:hidden;"><span style="display:inline-block;">${c === ' ' ? '&nbsp;' : c}</span></span>`
        ).
        join('');
        const chars = heading.querySelectorAll('span span');
        tl.fromTo(
          chars,
          {
            y: '100%',
            opacity: 0
          },
          {
            y: '0%',
            opacity: 1,
            duration: 0.6,
            stagger: 0.02,
            ease: 'power3.out'
          },
          0.2
        );
      }
      // Content fade up
      tl.fromTo(
        contentRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out'
        },
        0.3
      );
      // Tags stagger
      const tags = tagsRef.current?.querySelectorAll('.lang-tag');
      if (tags) {
        tl.fromTo(
          tags,
          {
            scale: 0.7,
            opacity: 0,
            y: 10
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: 'back.out(2)'
          },
          0.5
        );
      }
    }, cardRef);
    return () => ctx.revert();
  }, [isEven]);
  return (
    <div
      ref={cardRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(32px, 5vw, 80px)',
        alignItems: 'center',
        padding: 'clamp(40px, 6vw, 80px) 0',
        direction: isEven ? 'rtl' : 'ltr'
      }}>

      {/* Image */}
      <div
        ref={imageRef}
        className="project-image-wrap"
        style={{
          direction: 'ltr',
          aspectRatio: '4/3',
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px var(--shadow)'
        }}>

        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          loading="lazy" />

        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
            'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
            pointerEvents: 'none'
          }} />

      </div>

      {/* Content */}
      <div
        style={{
          direction: 'ltr',
          position: 'relative'
        }}>

        {/* Big number */}
        <div
          ref={numRef}
          style={{
            position: 'absolute',
            top: '-20px',
            left: '-10px',
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(80px, 12vw, 140px)',
            fontWeight: 800,
            color: 'var(--text)',
            opacity: 0,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 0
          }}>

          {project.num}
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1
          }}>

          <h3
            ref={titleRef}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(26px, 3.5vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: '16px',
              lineHeight: 1.1
            }}>

            {project.title}
          </h3>

          <div
            ref={contentRef}
            style={{
              opacity: 0
            }}>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: 300,
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginBottom: '24px'
              }}>

              {project.desc}
            </p>

            {/* Tags */}
            <div
              ref={tagsRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '28px'
              }}>

              {project.langs.map((lang) =>
              <span
                key={lang}
                className="lang-tag"
                style={{
                  opacity: 0
                }}>

                  {lang}
                </span>
              )}
            </div>

            {/* View link */}
            <a
              href={project.proLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--accent)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                cursor: 'none'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  x: 4,
                  duration: 0.2
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  x: 0,
                  duration: 0.2
                });
              }}>

              View Project
              <ArrowUpRightIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>);

}
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
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
      gsap.fromTo(
        headingRef.current,
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%'
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 100px)',
        position: 'relative'
      }}>

      {/* Large faded number */}
      <div
        className="section-num"
        style={{
          position: 'absolute',
          top: '40px',
          right: 'clamp(24px, 6vw, 100px)'
        }}>

        02
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>

        {/* Header */}
        <div
          style={{
            marginBottom: 'clamp(40px, 6vw, 80px)'
          }}>

          <div
            ref={labelRef}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
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

              Selected Work
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
              opacity: 0
            }}>

            Projects I've Built
          </h2>
        </div>

        {/* Projects list */}
        <div>
          {PROJECTS.map((project, index) =>
          <div key={project.num}>
              <ProjectCard project={project} index={index} />
              {index < PROJECTS.length - 1 &&
            <div
              style={{
                height: '1px',
                background: 'var(--border)',
                width: '100%'
              }} />

            }
            </div>
          )}
        </div>
      </div>
    </section>);

}
