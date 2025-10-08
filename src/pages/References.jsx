// src/pages/References.jsx

import React, { useEffect, useRef, useState } from 'react';
import styles from './References.module.css';

// Import references data from JSON file
import referencesData from '../database/referencesData.json'

// Import fallback images - CORRECTED PLACEHOLDER FILE NAME CASE
import raimaImage from '../assets/referenceImg/raima-dcosta.jpg';
import michaelImage from '../assets/referenceImg/michael-chen.jpg';
import sarahImage from '../assets/referenceImg/sarah-johnson.jpg';
import alexImage from '../assets/referenceImg/alex-rodriguez.jpg';
// FIX: The file is named 'placeholderImage.jpeg' (with a capital I) in your assets folder.
import placeholderImage from '../assets/referenceImg/placeholderImage.jpeg'; 
// The rest of the component is already well-designed.

const References = () => {
  const referenceItems = useRef([]);
  const [imageSources, setImageSources] = useState({});
  
  // Map reference names to their corresponding fallback images
  const fallbackImages = {
    "Raima D'costa": raimaImage,
    "Michael Chen": michaelImage,
    "Dr. Sarah Johnson": sarahImage,
    "Alex Rodriguez": alexImage
  };
  
  // Handler for image loading errors
  const handleImageError = (name) => {
    setImageSources(prev => ({
      ...prev,
      [name]: fallbackImages[name] || placeholderImage
    }));
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    // Update observer for items
    const updateObserver = () => {
      const currentItems = referenceItems.current;
      
      if (currentItems && currentItems.forEach) {
        // You should not need a setTimeout for this, but keeping your original design for now.
        currentItems.forEach((item) => {
          if (item) observer.observe(item);
        });
      }
    };
    
    // Set up observer after component mounts
    setTimeout(updateObserver, 100);
    
    return () => {
      // Cleanup observer
      const currentItems = referenceItems.current;
      if (currentItems && currentItems.forEach) {
        currentItems.forEach((item) => {
          if (item) observer.unobserve(item);
        });
      }
    };
  }, []);
  
  // Check if we have references data
  if (referencesData.length === 0) {
    return null; // Don't render the section if no data
  }
  
  return (
    <section id="references" className={styles.references}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>References</h2>
        
        <div className={styles.referencesIntro}>
          Here's what my clients and colleagues have to say about working with me.
        </div>
        
        <div className={styles.referencesGrid}>
          {referencesData.map((reference, index) => (
            <div 
              key={index} 
              className={`${styles.referenceCard} ${styles.glassCard}`}
              ref={el => referenceItems.current[index] = el}
            >
              <div className={styles.refHeader}>
                <div className={styles.referenceImage}>
                  <img 
                    // This logic is correct: 1. state override, 2. project data path, 3. hardcoded fallback, 4. placeholder
                    src={imageSources[reference.name] || reference.image || fallbackImages[reference.name] || placeholderImage} 
                    alt={reference.name}
                    onError={() => handleImageError(reference.name)}
                    loading="lazy" // Added for performance
                  />
                </div>
                <div className={styles.refInfo}>
                  <h3>{reference.name}</h3>
                  <p className={styles.refPosition}>{reference.position}</p>
                  <p className={styles.refCompany}>
                    @ <a href={reference.companyUrl} target="_blank" rel="noopener noreferrer">{reference.company}</a>
                  </p>
                </div>
              </div>
              
              <div className={styles.quote}>
                <p>"{reference.quote}"</p>
              </div>
              
              <div className={styles.refContacts}>
                {reference.email && (
                  <a href={`mailto:${reference.email}`} className={styles.contactLink} title={`Email ${reference.name}`}>
                    <i className="fas fa-envelope"></i>
                  </a>
                )}
                {reference.linkedin && (
                  <a href={reference.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactLink} title={`LinkedIn of ${reference.name}`}>
                    <i className="fab fa-linkedin"></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default References;