import { Instagram, Facebook, Mail, Menu, X } from 'lucide-react';
import { INSTAGRAM_LINK, FACEBOOK_LINK, CONTACT_QUOTE_EMAIL, BRAND_NAME } from '../globals';

interface NavbarProps {
  isMobileView: boolean;
  isMobileMenuOpen: boolean;
  activeSection: string;
  onMenuToggle: () => void;
  onNavClick: (sectionId: string) => void;
  navItems: Array<{ id: string; label: string }>;
  isVisible: boolean;
  isInitialLoad: boolean;
}

export function Navbar({
  isMobileView,
  isMobileMenuOpen,
  activeSection,
  onMenuToggle,
  onNavClick,
  navItems,
  isVisible,
  isInitialLoad
}: NavbarProps) {
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-background-dark/90 backdrop-blur-sm border-b border-border-dark transition-transform duration-300 ease-in-out ${
        isVisible || isInitialLoad ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'AnandaBlack' }}>
          {BRAND_NAME}
        </h1>
        
        {/* Desktop Navigation */}
        {!isMobileView && (
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id 
                    ? 'text-content-white bg-primary-dark' 
                    : 'text-content-primary hover:bg-background-secondary hover:text-content-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex space-x-4 ml-4">
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-content-muted hover:text-content-white">
                <Instagram size={20} />
              </a>
              <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="text-content-muted hover:text-content-white">
                <Facebook size={20} />
              </a>
              <a href={`mailto:${CONTACT_QUOTE_EMAIL}`} className="text-content-muted hover:text-content-white">
                <Mail size={20} />
              </a>
            </div>
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isMobileView && (
          <button 
            onClick={onMenuToggle}
            className="p-2 rounded-md text-content-primary hover:text-content-white hover:bg-background-light focus:outline-none"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileView && isMobileMenuOpen && (
        <div className="bg-background-dark border-t border-border-dark">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavClick(item.id);
                  onMenuToggle();
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeSection === item.id 
                    ? 'bg-primary-dark text-content-white' 
                    : 'text-content-primary hover:bg-background-secondary hover:text-content-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex justify-center space-x-6 py-4">
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-content-muted hover:text-content-white">
                <Instagram size={24} />
              </a>
              <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="text-content-muted hover:text-content-white">
                <Facebook size={24} />
              </a>
              <a href={`mailto:${CONTACT_QUOTE_EMAIL}`} className="text-content-muted hover:text-content-white">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
