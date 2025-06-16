import { useState, useEffect } from 'react';
import './App.css';
import Portfolio from './components/Portfolio';
import { HeroCard } from './components/HeroCard';
import { Navbar } from './components/Navbar';
import AboutMe from './components/AboutMe';
import ThreeJsStars from './components/animations/threeJsStars';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Show header when scrolling up or at top
      const shouldBeVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      
      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible);
      }
      
      setPrevScrollPos(currentScrollPos);
      
      // Set isInitialLoad to false after the first scroll
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'portfolio'];
      const scrollPosition = currentScrollPos + 100; // Add offset for header
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, prevScrollPos, isInitialLoad]);

  // Check if we're in mobile view
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
    <div className="min-h-screen text-content-white">
      {/* Three.js Background */}
      <ThreeJsStars className="fixed inset-0 -z-10" />

      {/* Navbar */}
      <Navbar
        isMobileView={isMobileView}
        isMobileMenuOpen={isMobileMenuOpen}
        activeSection={activeSection}
        onMenuToggle={toggleMobileMenu}
        onNavClick={scrollToSection}
        navItems={navItems}
        isVisible={isVisible}
        isInitialLoad={isInitialLoad}
      />

      {/* Main Content */}
      <main>
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-3xl mx-auto text-center">
            <HeroCard />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-8">
          <AboutMe />
        </section>
        
        {/* Portfolio Section */}
        <section id="portfolio" className="min-h-screen py-20 px-8">
          <Portfolio />
        </section>
      </main>
    </div>
  );
}

export default App;