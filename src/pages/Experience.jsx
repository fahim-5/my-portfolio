import React, { useEffect, useRef } from 'react';
import styles from './Experience.module.css';
// Import data from the JSON file
import experienceData from "../database/experienceData.json";

const Experience = () => {
  const experienceItems = useRef([]);

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

    experienceItems.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      experienceItems.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Work Experience</h2>

        <div className={styles.experienceGrid}>
          {experienceData.map((exp, index) => (
            <div
              key={index}
              className={`${styles.expItem} ${styles.glassCard}`}
              ref={(el) => (experienceItems.current[index] = el)}
            >
              <h3>
                {exp.title} – <span>{exp.role}</span>
              </h3>
              <h4>{exp.company}</h4>
              <h5>
                {exp.location} | {exp.period}
              </h5>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;