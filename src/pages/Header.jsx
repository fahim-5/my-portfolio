import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const personalInfo = {
    name: 'Fahim',
    // Full name and title are not needed for this minimal mobile menu style
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };
  
  // Use useEffect to prevent body scrolling when the menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);


  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>{personalInfo.name.toLowerCase()}</h1>
        </div>

        {/* Regular navigation (hidden on mobile) */}
        <nav className={styles.desktopNav}>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#pictures">Pictures</a></li>
            <li><a href="#references">References</a></li>
          </ul>
        </nav>

        {/* Hamburger Icon (visible on mobile) */}
        <div className={styles.hamburgerMenu} onClick={toggleMobileMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>

        {/* Mobile Navigation Overlay/Sidebar - Minimal Style */}
        <div className={`${styles.mobileNavOverlay} ${isMobileMenuOpen ? styles.open : ''}`}>
          
          {/* Close Button at the very top right */}
          <div className={styles.closeButton} onClick={toggleMobileMenu}>
            <span className={styles.closeIcon}>&times;</span>
          </div>
          
          {/* Main Content of Sidebar - Just links */}
          <div className={styles.mobileNavContent}>
            <nav className={styles.mobileNav}>
              <ul>
                <li><a href="#home" onClick={handleNavLinkClick}>Home</a></li>
                <li><a href="#about" onClick={handleNavLinkClick}>About</a></li>
                <li><a href="#education" onClick={handleNavLinkClick}>Education</a></li>
                <li><a href="#experience" onClick={handleNavLinkClick}>Experience</a></li>
                <li><a href="#skills" onClick={handleNavLinkClick}>Skills</a></li>
                <li><a href="#portfolio" onClick={handleNavLinkClick}>Portfolio</a></li>
                <li><a href="#pictures" onClick={handleNavLinkClick}>Pictures</a></li>
                <li><a href="#references" onClick={handleNavLinkClick}>References</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;