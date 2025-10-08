import React, { useState, useEffect } from 'react';
import { FaLinkedinIn, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const socialLinks = [
    {
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/fahim-faysal-6a6425253/',
      icon: <FaLinkedinIn />,
      color: '#0077b5'
    },
    {
      name: 'github',
      url: 'https://github.com/fahim-5',
      icon: <FaGithub />,
      color: '#333'
    },
    {
      name: 'twitter',
      url: 'https://x.com/bafu_44',
      icon: <FaTwitter />,
      color: '#1da1f2'
    },
    {
      name: 'instagram',
      url: 'https://www.instagram.com/bafu.06/',
      icon: <FaInstagram />,
      color: '#e4405f'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <footer className={`${styles.footer} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerText}>
            <p className={styles.copyright}>
              &copy; {new Date().getFullYear()} Fahim Faysal. All rights reserved.
            </p>
          </div>
          
          <div className={styles.footerSocial}>
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                className={`${styles.socialIcon} ${hoveredIcon === social.name ? styles.hovered : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredIcon(social.name)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <span className={styles.socialIconInner}>
                  {social.icon}
                </span>
                <span 
                  className={styles.iconBackground} 
                  style={{ backgroundColor: social.color }}
                ></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;