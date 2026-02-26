import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SunIcon, MoonIcon } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}
const NAV_ITEMS = [
{
  label: 'Home',
  href: '#home'
},
{
  label: 'About',
  href: '#about'
},
{
  label: 'Projects',
  href: '#projects'
},
{
  label: 'Contact',
  href: '#contact'
}];

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    // Entrance animation — stagger from top
    const allBubbles = [
    ...bubblesRef.current.filter(Boolean),
    toggleRef.current];

    gsap.fromTo(
      allBubbles,
      {
        y: -60,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'back.out(1.7)',
        delay: 0.3
      }
    );
    // Scroll shrink effect
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: (self) => {
        const progress = Math.min(self.progress * 5, 1);
        allBubbles.forEach((el) => {
          if (el) {
            gsap.to(el, {
              scale: 1 - progress * 0.05,
              backdropFilter: `blur(${12 + progress * 8}px)`,
              duration: 0.3,
              overwrite: 'auto'
            });
          }
        });
      }
    });
    // Active section detection
    const sections = ['home', 'about', 'projects', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        {
          threshold: 0.4
        }
      );
      obs.observe(el);
      return obs;
    });
    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);
  const handleNavClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string) =>
  {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const getBubbleStyle = (label: string): React.CSSProperties => {
    const isActive = activeSection === label.toLowerCase();
    return {
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      background: isActive ?
      'var(--accent)' :
      theme === 'dark' ?
      'rgba(255,255,255,0.06)' :
      'rgba(0,0,0,0.05)',
      border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius: '999px',
      color: isActive ? '#fff' : 'var(--text)',
      padding: '10px 20px',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      boxShadow: isActive ?
      '0 0 20px rgba(167,139,250,0.3)' :
      '0 4px 20px var(--shadow)',
      cursor: 'none'
    };
  };
  return (
    <nav
      style={{
        position: 'fixed',
        top: '24px',
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        pointerEvents: 'none'
      }}
      aria-label="Main navigation">

      {/* Nav bubbles */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          pointerEvents: 'auto'
        }}>

        {NAV_ITEMS.map((item, i) =>
        <a
          key={item.label}
          ref={(el) => {
            bubblesRef.current[i] = el;
          }}
          href={item.href}
          onClick={(e) => handleNavClick(e, item.href)}
          style={getBubbleStyle(item.label)}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            if (activeSection !== item.label.toLowerCase()) {
              gsap.to(el, {
                scale: 1.08,
                boxShadow: '0 0 16px rgba(167,139,250,0.25)',
                duration: 0.25,
                ease: 'power2.out'
              });
            }
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            gsap.to(el, {
              scale: 1,
              boxShadow: '0 4px 20px var(--shadow)',
              duration: 0.25
            });
          }}
          aria-current={
          activeSection === item.label.toLowerCase() ? 'page' : undefined
          }>

            {item.label}
          </a>
        )}
      </div>

      {/* Spacer */}
      <div
        style={{
          width: '16px'
        }} />


      {/* Theme toggle bubble */}
      <button
        ref={toggleRef}
        onClick={toggleTheme}
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          background:
          theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
          border: '1px solid var(--border)',
          borderRadius: '999px',
          color: 'var(--text)',
          padding: '10px 14px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'none',
          pointerEvents: 'auto',
          boxShadow: '0 4px 20px var(--shadow)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1.1,
            duration: 0.25,
            ease: 'power2.out'
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.25
          });
        }}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>

        {theme === 'dark' ?
        <SunIcon size={16} color="var(--text)" /> :

        <MoonIcon size={16} color="var(--text)" />
        }
      </button>
    </nav>);

}