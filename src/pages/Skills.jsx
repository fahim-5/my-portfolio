import React, { useState, useEffect, useRef } from 'react';
import styles from './Skills.module.css';
// Import data from JSON file
import skillsData from '../database/skillsData.json';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const skillItems = useRef([]);
  
  useEffect(() => {
    // Make sure all skill items are initially visible
    setTimeout(() => {
      const currentItems = skillItems.current;
      currentItems.forEach((item) => {
        if (item) item.classList.add(styles.revealed);
      });
    }, 100);
    
    // Set up intersection observer for animation on scroll
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
    
    const currentItems = skillItems.current;
    
    currentItems.forEach((item) => {
      if (item) observer.observe(item);
    });
    
    return () => {
      currentItems.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, [activeTab]);

  // Get level description for display
  const getLevelDescription = (level) => {
    const descriptions = {
      'beginner': 'Basic knowledge with some practical experience',
      'elementary': 'Good working knowledge with limited experience',
      'intermediate': 'Solid understanding with regular application',
      'advanced': 'Deep knowledge with extensive practical experience',
      'expert': 'Mastery level with the ability to teach others',
      'native': 'Native proficiency'
    };
    
    return descriptions[level] || '';
  };
  
  // Function to render the appropriate active skills
  const getActiveSkills = () => {
    return skillsData[activeTab] || [];
  };
  
  // Check if we have skills data
  const hasSkills = Object.values(skillsData).some(category => category.length > 0);
  if (!hasSkills) {
    return null; // Don't render the section if no data
  }
  
  const hasLanguages = skillsData.languages && skillsData.languages.length > 0;
  
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
      
        
        <div className={styles.skillsHeader}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'technical' ? styles.active : ''}`}
            onClick={() => setActiveTab('technical')}
          >
            <i className="fas fa-code"></i>
            Technical Skills
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'soft' ? styles.active : ''}`}
            onClick={() => setActiveTab('soft')}
          >
            <i className="fas fa-users"></i>
            Soft Skills
          </button>
          {hasLanguages && (
            <button 
              className={`${styles.tabButton} ${activeTab === 'languages' ? styles.active : ''}`}
              onClick={() => setActiveTab('languages')}
            >
              <i className="fas fa-language"></i>
              Languages
            </button>
          )}
        </div>
        
        <div className={styles.skillsGrid}>
          {getActiveSkills().map((skill, index) => (
            <div 
              key={index} 
              className={`${styles.skillCard} ${styles.glassCard}`}
              ref={el => skillItems.current[index] = el}
              title={skill.description}
            >
              <div className={styles.skillIcon}>
                <i className={skill.icon}></i>
              </div>
              <div className={styles.skillContent}>
                <h3>{skill.name}</h3>
                {skill.level && (
                  <div className={styles.skillLevel}>
                    <div className={`${styles.skillLevelBar} ${styles[skill.level]}`}></div>
                    <p className={styles.skillLevelText}>
                      {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                      <span className={styles.tooltip}>{getLevelDescription(skill.level)}</span>
                    </p>
                  </div>
                )}
                {skill.category && (
                  <span className={styles.skillCategory}>{skill.category}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;