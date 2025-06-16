import { Instagram, Facebook, Mail, Menu, X } from 'lucide-react';
import { OWNER_NAME, INSTAGRAM_LINK, FACEBOOK_LINK, CONTACT_QUOTE_EMAIL } from '../globals';

interface NavbarProps {
  isMobileView: boolean;
  isMobileMenuOpen: boolean;
  activeSection: string;
  onMenuToggle: () => void;
  onNavClick: (sectionId: string) => void;
  navItems: Array<{ id: string; label: string }>;
}

export function Navbar({
  isMobileView,
  isMobileMenuOpen,
  activeSection,
  onMenuToggle,
  onNavClick,
  navItems
}: NavbarProps) {
  return (
    <>
      {/* Mobile Menu Button - Only shows on mobile/portrait */}
      {isMobileView && (
        <button 
          onClick={onMenuToggle}
          className="fixed top-4 right-4 z-50 p-2 rounded-md text-content-primary hover:text-content-white hover:bg-background-light focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar - Responsive behavior */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 ${
          isMobileView ? 'w-64' : 'w-1/5'
        } transform transition-transform duration-300 ease-in-out ${
          isMobileView && !isMobileMenuOpen ? '-translate-x-full' : 'translate-x-0'
        } bg-background-dark bg-opacity-90 backdrop-blur-sm border-r border-border-dark flex flex-col justify-between p-4 lg:p-8`}
      >
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'AnandaBlack' }}>
            {OWNER_NAME}
          </h1>
          <p className="text-gray-400 mb-12">Artist & Creator</p>
          
          <nav className="space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeSection === item.id 
                    ? 'bg-primary-dark text-content-white' 
                    : 'text-content-primary hover:bg-background-secondary hover:text-content-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex space-x-4">
            <a 
              href={INSTAGRAM_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-content-muted hover:text-content-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a 
              href={FACEBOOK_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-content-muted hover:text-content-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a 
              href={`mailto:${CONTACT_QUOTE_EMAIL}`}
              className="text-content-muted hover:text-content-white transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
          {/* <p className="mt-4 text-sm text-content-muted">
            &copy; {new Date().getFullYear()} {OWNER_NAME}. All rights reserved.
          </p> */}
        </div>
      </div>
    </>
  );
}
