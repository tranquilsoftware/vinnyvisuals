import { useState, useEffect } from 'react';
import './App.css';
import Portfolio from './components/Portfolio';
import { HeroCard } from './components/HeroCard';
import { Navbar } from './components/Navbar';

// import AnimatedBackground from './components/animations/AnimatedBackground';
// import { PulsatingThing } from './components/animations/PulsatingThing';
// import RotatingImageBackground from './components/animations/RotatingImageBackground';
// import { BG_IMG } from './globals';

import AboutMe from './components/AboutMe';
import ThreeJsStars from './components/animations/threeJsStars';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Set up intersection observer for scroll-based active section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
      observer.observe(section);
    });

    // Cleanup
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Check if we're in mobile view (width < 1024px or portrait mode)
  useEffect(() => {
    const checkMobileView = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobileView(isSmallScreen || isPortrait);
      
      // Close menu when switching to desktop view
      if (!isSmallScreen && !isPortrait) {
        setIsMobileMenuOpen(false);
      }
    };

    // Initial check
    checkMobileView();

    // Add event listeners
    window.addEventListener('resize', checkMobileView);
    window.addEventListener('orientationchange', checkMobileView);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobileView);
      window.removeEventListener('orientationchange', checkMobileView);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      // Close menu on mobile after clicking a link
      if (isMobileView) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
  ];

  return (
    <div className="min-h-screen text-content-white flex">
    {/* Three.js Background - Moved to root level */}
    <ThreeJsStars className="fixed inset-0" />

      {/* Animated Background */}
      {/* <div className="fixed inset-0 z-0 w-full h-full">
        <RotatingImageBackground 
          image={BG_IMG}
          imageCount={25}
          minSize={22}
          maxSize={77}
          minOpacity={0.01}
          maxOpacity={0.15}
          minSpeed={10}
          maxSpeed={100}
        />
      </div> */}

      {/* <PulsatingThing /> */}


      <Navbar
        isMobileView={isMobileView}
        isMobileMenuOpen={isMobileMenuOpen}
        activeSection={activeSection}
        onMenuToggle={toggleMobileMenu}
        onNavClick={scrollToSection}
        navItems={navItems}
      />


      {/* Main Content - Responsive width */}
      <div className={`transition-all duration-300 ${
        isMobileView ? 'w-full' : 'w-4/5 ml-auto'
      }`}>  
        <main className="min-h-screen">

          {/* Home Section */}
          <section id="home" className="min-h-screen flex items-center justify-center p-8">
            <div className="max-w-3xl mx-auto text-center">
              <HeroCard />
            </div>
          </section>

          
          {/* Team Section */}
          <section id="about" className="py-20 px-8">
            <AboutMe />
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="min-h-screen py-20 px-8">
            <Portfolio />
          </section>



        </main>
      </div>
    </div>
  );
}

export default App;