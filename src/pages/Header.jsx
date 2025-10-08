import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const personalInfo = {
    name: 'Fahim',
  };

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Gallery', href: '#pictures' },
    { name: 'References', href: '#references' }, 
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Scroll to hero section when clicking on the logo/name
  const scrollToHero = (e) => {
    e.preventDefault();
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Effect to prevent body scrolling when the menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>
            <a 
              href="#home" 
              onClick={scrollToHero}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {personalInfo.name.toLowerCase()}
            </a>
          </h1>
        </div>

        {/* Regular navigation (hidden on mobile) */}
        <nav className={styles.desktopNav}>
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href} 
                  onClick={(e) => {
                    if (item.href === '#home') {
                      e.preventDefault();
                      scrollToHero(e);
                    } else {
                      handleNavLinkClick();
                    }
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger Icon (visible on mobile) */}
        <div 
          className={styles.hamburgerMenu} 
          onClick={toggleMobileMenu} 
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu-navigation"
          role="button"
          tabIndex="0"
        >
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>

        {/* Mobile Navigation Overlay/Sidebar */}
        <div 
          className={`${styles.mobileNavOverlay} ${isMobileMenuOpen ? styles.open : ''}`}
          id="mobile-menu-navigation"
        >
          
          {/* Close Button at the very top right */}
          <div 
            className={styles.closeButton} 
            onClick={toggleMobileMenu}
            role="button"
            tabIndex="0"
            aria-label="Close menu"
          >
            <span className={styles.closeIcon}>&times;</span>
          </div>
          
          {/* Main Content of Sidebar - Just links */}
          <div className={styles.mobileNavContent}>
            <nav className={styles.mobileNav}>
              <ul>
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href} 
                      onClick={(e) => {
                        if (item.href === '#home') {
                          e.preventDefault();
                          scrollToHero(e);
                        } else {
                          handleNavLinkClick();
                        }
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;