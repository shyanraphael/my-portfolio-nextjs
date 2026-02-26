import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useTheme } from './hooks/useTheme';
import { useLenis } from './hooks/useLenis';
gsap.registerPlugin(ScrollTrigger);
export function App() {
  const { theme, toggleTheme } = useTheme();
  useLenis();
  useEffect(() => {
    // Set initial theme on mount
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return (
    <div
      style={{
        background: 'var(--bg)',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden'
      }}>

      <CustomCursor theme={theme} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>);

}