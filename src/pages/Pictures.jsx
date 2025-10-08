import React, { useEffect, useRef } from 'react';
import styles from './Pictures.module.css';
// Import the static JSON data file
import picturesData from '../database/picturesData.json'; 

// --- START: DIRECT IMAGE IMPORTS ---
// Import the specific image files from the assets folder.
import mosjidImage from '../assets/picturesImg/Mosjid.jpg';
import gorundImage from '../assets/picturesImg/gorund.jpg';
import urbanImage from '../assets/picturesImg/urban.jpg';

// Define a mapping of project titles to their imported image variables
const imageMap = {
  "Beautiful Mosque – Night View": mosjidImage,
  "University Ground": gorundImage,
  "Urban Architecture": urbanImage,
};
// --- END: DIRECT IMAGE IMPORTS ---

const Pictures = () => {
  const pictureItems = useRef([]);
  
  // Dedicated Intersection Observer for the reveal animation
  useEffect(() => {
    // Filter out nulls/undefined from the ref array
    const currentItems = pictureItems.current.filter(Boolean);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            // Optional: Stop observing once revealed for performance
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.2 } // Reveals when 20% of the item is visible
    );
    
    // Start observing all items
    currentItems.forEach((item) => {
      observer.observe(item);
    });
    
    // Cleanup function: remove observer when component unmounts
    return () => {
      currentItems.forEach((item) => {
        if (item) observer.unobserve(item);
      });
      observer.disconnect(); // Disconnect the observer completely on unmount
    };
  }, []); // Empty dependency array: runs only once after mount

  // Filter data to ensure only items with a matching image in the map are considered
  const dataToDisplay = picturesData.filter(pic => imageMap[pic.title]);

  // Do not render the section if no displayable data is available
  if (dataToDisplay.length === 0) {
    return null;
  }
  
  return (
    <section id="pictures" className={styles.pictures}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Photography</h2>
        
        <div className={styles.picturesGrid}>
          {dataToDisplay.map((picture, index) => (
            <div 
              key={index} 
              className={`${styles.pictureCard} ${styles.glassCard}`}
              // Assign ref dynamically using a callback
              ref={el => pictureItems.current[index] = el}
            >
              <div className={styles.pictureImage}>
                <img 
                  // Use the imported image path from the map
                  src={imageMap[picture.title]}
                  alt={picture.title}
                  className={styles.pictureImg}
                  loading="lazy"
                />
              </div>
              <div className={styles.pictureContent}>
                <span className={styles.pictureTag}>{picture.category}</span>
                <h3>{picture.title}</h3>
                <p>{picture.description}</p>
                {picture.link && (
                  <a 
                    href={picture.link} 
                    className={styles.viewPicture} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View Full Size <i className="fa-solid fa-up-right-from-square"></i>
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

export default Pictures;