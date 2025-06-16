import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from "./ui/Button"
import { useLocation, useNavigate } from 'react-router-dom'
import { HREF_PRODUCT_LINK, HREF_HOME_LINK, BRAND_NAME } from '../globals'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isInitialLoad, setIsInitialLoad] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  const menuItems = [
    { name: 'Lookbook', href: '#lookbook' }, 
    { name: 'Shop', href: HREF_PRODUCT_LINK },
  ]

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return location.hash === href
    }
    if (href.startsWith('/')) {
      return location.pathname === href
    }
    return false
  }

  const handleNavigation = (href: string) => {
    if (href.startsWith('http')) {
      // For external URLs, open in a new tab
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (href.startsWith('#')) {
      // If we're not on the home page and trying to access an anchor
      if (location.pathname !== '/') {
        navigate('/' + href)
      } else {
        document.getElementById(href.substring(1))?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // For regular routes (like /team), navigate and scroll to top
      navigate(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    // Detect if the device is iOS
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    setIsIOS(/(iPad|iPhone|iPod)/gi.test(userAgent));

    // Function to handle scroll events
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Show header when scrolling up
      setIsVisible(prevScrollPos > currentScrollPos);
      
      setPrevScrollPos(currentScrollPos);
      
      // Set isInitialLoad to false after the first scroll
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isInitialLoad, isVisible]);

  return (
  <header 
    className={`fixed top-0 left-0 right-0 z-50 bg-background-dark/80 backdrop-blur-md ${isIOS ? 'ios-safe-area' : ''} 
      ${isVisible || isInitialLoad ? 'translate-y-0' : '-translate-y-full transition-transform duration-300 ease-in-out'}`}
  >
      <div className="container mx-auto px-2 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">

            <a 
            href={HREF_HOME_LINK}
              className="flex items-center"
            >
              <div className="relative flex items-center justify-center">
              </div>
            {/* <span className="text-2xl font-bold gradient-text ml-4"> */}
              <span className="text-2xl text-content-primary font-bold ml-4"
              style={{ fontFamily: 'AnandaBlack' }}>
                {/* {FONT_BRAND_NAME} */}
                {BRAND_NAME}
              </span>
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`text-gray-300 hover:text-white transition-colors relative py-2
                  ${isActive(item.href) ? 'text-white' : ''}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 
                  after:w-full after:h-0.5 after:bg-gradient-to-r 
                  after:from-primary after:to-accent
                  after:scale-x-0 after:origin-left after:transition-transform
                  ${isActive(item.href) ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
                `}
              >
                {item.name}
              </button>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {isOpen && (
          <nav className="md:hidden py-4 space-y-4">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  handleNavigation(item.href)
                  setIsOpen(false)
                }}
                className={`block text-gray-300 hover:text-white transition-colors w-full text-left
                  ${isActive(item.href) ? 'text-white border-l-2 border-primary pl-2' : ''}
                `}
              >
                {item.name}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
