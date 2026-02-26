import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
interface CustomCursorProps {
  theme: string;
}
export function CustomCursor({ theme }: CustomCursorProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  useEffect(() => {
    const outer = outerRef.current;
    const dot = dotRef.current;
    if (!outer || !dot) return;
    // GSAP quickTo for smooth lag on outer ring
    const xOuter = gsap.quickTo(outer, 'x', {
      duration: 0.5,
      ease: 'power3.out'
    });
    const yOuter = gsap.quickTo(outer, 'y', {
      duration: 0.5,
      ease: 'power3.out'
    });
    const xDot = gsap.quickTo(dot, 'x', {
      duration: 0.08,
      ease: 'power3.out'
    });
    const yDot = gsap.quickTo(dot, 'y', {
      duration: 0.08,
      ease: 'power3.out'
    });
    const onMouseMove = (e: MouseEvent) => {
      xOuter(e.clientX);
      yOuter(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };
    const onMouseEnterInteractive = () => {
      isHovering.current = true;
      outer.classList.add('hovering');
      dot.classList.add('hovering');
      gsap.to(outer, {
        scale: 2,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(dot, {
        opacity: 0,
        duration: 0.2
      });
    };
    const onMouseLeaveInteractive = () => {
      isHovering.current = false;
      outer.classList.remove('hovering');
      dot.classList.remove('hovering');
      gsap.to(outer, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(dot, {
        opacity: 1,
        duration: 0.2
      });
    };
    const onMouseDown = () => {
      gsap.to(outer, {
        scale: isHovering.current ? 1.8 : 0.8,
        duration: 0.15
      });
      gsap.to(dot, {
        scale: 0.6,
        duration: 0.15
      });
    };
    const onMouseUp = () => {
      gsap.to(outer, {
        scale: isHovering.current ? 2 : 1,
        duration: 0.15
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.15
      });
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    // Add hover listeners to interactive elements
    const addInteractiveListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [data-cursor-hover]'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
    addInteractiveListeners();
    // Re-run when DOM changes
    const observer = new MutationObserver(addInteractiveListeners);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <div ref={outerRef} className="cursor-outer" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>);

}