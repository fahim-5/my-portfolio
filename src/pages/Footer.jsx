import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/fahim-faysal/',
    github: 'https://github.com/fahim-5',
    twitter: 'https://twitter.com/fahimfaysal',
    instagram: 'https://www.instagram.com/fahimfaysal/'
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerText}>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} Fahim Faysal. All rights reserved.
            </p>
          </div>
          
          <div className={styles.footerSocial}>
            <a href={socialLinks.linkedin} className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href={socialLinks.github} className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href={socialLinks.twitter} className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href={socialLinks.instagram} className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;