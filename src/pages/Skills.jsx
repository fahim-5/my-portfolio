import React, { useState, useEffect, useRef } from 'react';
import styles from './Skills.module.css';
// Import data from JSON file
import skillsData from '../database/skillsData.json';

// Import React Icons to replace Font Awesome
import { 
  FaReact, FaJsSquare, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, 
  FaDatabase, FaGitAlt, FaDocker, FaCode, FaServer, FaSitemap, 
  FaJava, FaCogs, FaPuzzlePiece, FaComments, FaUsers, FaUsersCog,
  FaClock, FaSync, FaBrain, FaLightbulb, FaSearch, FaLanguage
} from 'react-icons/fa';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const skillItems = useRef([]);
  
  // Map icon names to React Icons components
  const iconMap = {
    'fab fa-react': FaReact,
    'fab fa-js-square': FaJsSquare,
    'fab fa-node-js': FaNodeJs,
    'fab fa-python': FaPython,
    'fab fa-html5': FaHtml5,
    'fab fa-css3-alt': FaCss3Alt,
    'fas fa-database': FaDatabase,
    'fab fa-git-alt': FaGitAlt,
    'fab fa-docker': FaDocker,
    'fas fa-code': FaCode,
    'fas fa-server': FaServer,
    'fas fa-sitemap': FaSitemap,
    'fab fa-java': FaJava,
    'fas fa-cogs': FaCogs,
    'fas fa-puzzle-piece': FaPuzzlePiece,
    'fas fa-comments': FaComments,
    'fas fa-users': FaUsers,
    'fas fa-users-cog': FaUsersCog,
    'fas fa-clock': FaClock,
    'fas fa-sync': FaSync,
    'fas fa-brain': FaBrain,
    'fas fa-lightbulb': FaLightbulb,
    'fas fa-search': FaSearch,
    'fas fa-language': FaLanguage
  };

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
            <FaCode />
            Technical Skills
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'soft' ? styles.active : ''}`}
            onClick={() => setActiveTab('soft')}
          >
            <FaUsers />
            Soft Skills
          </button>
          {hasLanguages && (
            <button 
              className={`${styles.tabButton} ${activeTab === 'languages' ? styles.active : ''}`}
              onClick={() => setActiveTab('languages')}
            >
              <FaLanguage />
              Languages
            </button>
          )}
        </div>
        
        <div className={styles.skillsGrid}>
          {getActiveSkills().map((skill, index) => {
            const IconComponent = iconMap[skill.icon];
            return (
              <div 
                key={index} 
                className={`${styles.skillCard} ${styles.glassCard}`}
                ref={el => skillItems.current[index] = el}
                title={skill.description}
              >
                <div className={styles.skillIcon}>
                  {IconComponent ? <IconComponent /> : <FaCode />}
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;