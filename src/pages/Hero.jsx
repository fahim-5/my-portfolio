import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';
// Import the data from the new JSON file
import heroData from '../database/heroData.json';

// Note: profileImage import is kept for the onError fallback, 
// but the main image source is now read from heroData.
import profileImage from '../assets/Home.jpg'; 

const Hero = () => {
  // Destructure data for cleaner JSX
  const {
    greeting,
    name,
    lastName,
    description,
    jobTitle,
    stats,
    buttonText,
    cvButtonText,
    cvLink,
    profileImageUrl,
    personalInfo
  } = heroData;

  const [showContactModal, setShowContactModal] = useState(false);

  // Modal close on click outside logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector(`.${styles.contactModal}`);
      // Check if modal exists, if the click is outside, and if the modal is open
      if (modal && !modal.contains(event.target) && showContactModal) {
        setShowContactModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showContactModal]);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.intro}>
            {/* Added structure for the '— Hello, I'm' look */}
            <div className={styles.greetingLine}>
                <span className={styles.greetingDash}>—</span>
                <h2>{greeting}</h2>
            </div>
            
            <h1>
              <span className={styles.whiteName}>{name}</span>{' '}
              <span className={styles.gradientText}>{lastName}</span>
            </h1>
            <p>{description}</p>

            <div className={styles.stats}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  // Keep glassCard class for shared styling
                  className={`${styles.statItem} ${styles.glassCard}`} 
                >
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>

            <div className={styles.buttons}>
              {/* Note: The image shows 'View my CV' as the primary button and 'Get In Touch' as the secondary */}
              <a href={cvLink} download className={styles.btnLink1}>
                <button className={styles.btn1}>{cvButtonText}</button>
              </a>
              <button
                className={styles.btn2}
                onClick={() => setShowContactModal(true)}
              >
                {buttonText}
              </button>
            </div>
          </div>

          <div className={styles.heroImage}>
            {/* Image styling updated to match the trapezoid-like shape and dark border */}
            <img
              src={profileImageUrl}
              alt={`${name} ${lastName}`}
              onError={(e) => {
                console.log('Hero image failed to load, using default');
                e.target.src = profileImage;
              }}
            />
            <div className={styles.caption}>{jobTitle}</div>
          </div>
        </div>
      </div>

      {showContactModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.contactModal}>
            <button
              className={styles.closeButton}
              onClick={() => setShowContactModal(false)}
            >
              ×
            </button>
            <h2>{buttonText}</h2>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <i className="fas fa-envelope"></i>
                <p>{personalInfo.email}</p>
              </div>
              <div className={styles.contactItem}>
                <i className="fas fa-phone"></i>
                <p>{personalInfo.phone}</p>
              </div>
              <div className={styles.contactItem}>
                <i className="fas fa-map-marker-alt"></i>
                <p>{personalInfo.location}</p>
              </div>
            </div>
            <div className={styles.socialLinks}>
              <a
                href={personalInfo.socialLinks?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href={personalInfo.socialLinks?.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href={personalInfo.socialLinks?.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href={personalInfo.socialLinks?.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating background elements remain for ambient effect */}
      <div className={`${styles.floatingElement} ${styles.float1}`}></div>
      <div className={`${styles.floatingElement} ${styles.float2}`}></div>
      <div className={`${styles.floatingElement} ${styles.float3}`}></div>
    </section>
  );
};

export default Hero;