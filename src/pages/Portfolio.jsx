import React, { useEffect, useRef, useState } from 'react';
import styles from './Portfolio.module.css';
import projectsData from '../database/projectsData.json';

// Importing all images properly
import crimeReportImage from '../assets/projectImg/crimeReport.jpg';
import ecommerceImage from '../assets/projectImg/ecommerce.jpg';
import portfolioImage from '../assets/projectImg/portfolio.jpg';

// Use URL() for images that contain spaces or uppercase letters
const emergencyServiceImage = new URL('../assets/projectImg/EmergencyService.jpg', import.meta.url).href;
const greenEarthImage = new URL('../assets/projectImg/GreenEarth.jpg', import.meta.url).href;
const customerSupportImage = new URL('../assets/projectImg/CustomerService.jpg', import.meta.url).href;

// Placeholder image (optional)
const placeholderImage = '';

const Portfolio = () => {
  const projectItems = useRef([]);
  const [imageSources, setImageSources] = useState({});

  // Map project titles to fallback images
  const fallbackImages = {
    'Live Crime Reporting System': crimeReportImage,
    'eCommerce Website': ecommerceImage,
    'Personal Portfolio': portfolioImage,
    'Emergency Service': emergencyServiceImage,
    'Green Earth: Dynamic Tree Planting App': greenEarthImage,
    'Customer Support System': customerSupportImage,
  };

  // Handle broken image links
  const handleImageError = (title) => {
    setImageSources((prev) => ({
      ...prev,
      [title]: fallbackImages[title] || placeholderImage,
    }));
  };

  // Animate project reveal on scroll
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

    const currentItems = projectItems.current;
    currentItems.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      currentItems.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  if (!projectsData || projectsData.length === 0) return null;

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Projects</h2>

        <div className={styles.portfolioGrid}>
          {projectsData.map((project, index) => (
            <div
              key={index}
              className={`${styles.projectCard} ${styles.glassCard}`}
              ref={(el) => (projectItems.current[index] = el)}
            >
              <div className={styles.projectImage}>
                <img
                  src={
                    imageSources[project.title] ||
                    fallbackImages[project.title] ||
                    project.image ||
                    placeholderImage
                  }
                  alt={project.title}
                  onError={() => handleImageError(project.title)}
                  loading="lazy"
                />
                <div className={styles.projectOverlay}>
                  <div className={styles.projectLinks}>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        className={styles.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo"
                      >
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        className={styles.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Source Code"
                      >
                        <i className="fab fa-github"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.projectContent}>
                <span
                  className={`${styles.projectTag} ${
                    styles[project.category.toLowerCase().replace(' ', '-')]
                  }`}
                >
                  {project.category}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                {project.technologies && (
                  <div className={styles.techTags}>
                    {project.technologies.split(',').map((tech, techIndex) => (
                      <span key={techIndex} className={styles.techTag}>
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div className={styles.projectActions}>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      className={styles.viewProject}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      Live Demo
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      className={styles.viewSource}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github"></i>
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
