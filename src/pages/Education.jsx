import React, { useEffect, useRef } from 'react';
import styles from './Education.module.css';
// Import data from the JSON file
import educationData from "../database/educationData.json";

const Education = () => {
  const educationItems = useRef([]);

  useEffect(() => {
    // Intersection Observer logic for scroll-based animation
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

    // Note: educationItems.current is an array of DOM elements
    const currentItems = educationItems.current; 
    
    // Only attempt to observe if the array is populated
    if (currentItems) {
      currentItems.forEach((item) => item && observer.observe(item));
    }

    return () => {
      if (currentItems) {
        currentItems.forEach((item) => item && observer.unobserve(item));
      }
    };
  }, []);
  
  return (
    <section id="education" className={styles.education}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Education</h2>

        <div className={styles.educationGrid}>
          {educationData.map((edu, index) => (
            <div
              key={index}
              className={`${styles.eduItem} ${styles.glassCard}`}
              // The ref callback sets the DOM element into the array for the IntersectionObserver
              ref={(el) => (educationItems.current[index] = el)}
            >
              <h3>{edu.degree}</h3>
              <h4>{edu.institution}</h4>
              <h5>
                {edu.location} | {edu.period}
              </h5>
              <p>{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;