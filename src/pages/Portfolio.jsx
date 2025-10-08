import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import styles from './Portfolio.module.css';
import projectsData from '../database/projectsData.json';

// --- Image imports (unchanged) ---
import crimeReportImage from '../assets/projectImg/crimeReport.jpg';
import ecommerceImage from '../assets/projectImg/ecommerce.jpg';
import portfolioImage from '../assets/projectImg/portfolio.jpg';
const emergencyServiceImage = new URL('../assets/projectImg/Emergencyservice.jpeg', import.meta.url).href;
const greenEarthImage = new URL('../assets/projectImg/GreenEarth.jpeg', import.meta.url).href;
const customerSupportImage = new URL('../assets/projectImg/CustomerService.jpg', import.meta.url).href;
const placeholderImage = '';

const Portfolio = () => {
  const projectItems = useRef([]);
  const [imageSources, setImageSources] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const fallbackImages = {
    'Live Crime Reporting System': crimeReportImage,
    'eCommerce Website': ecommerceImage,
    'Personal Portfolio': portfolioImage,
    'Emergency Service': emergencyServiceImage,
    'Green Earth: Dynamic Tree Planting App': greenEarthImage,
    'Customer Support System': customerSupportImage,
  };

  // --- Pagination setup ---
  const projectsPerPage = 3;
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);

  const currentProjects = isMobile
    ? showAll
      ? projectsData
      : projectsData.slice(0, 3)
    : projectsData.slice(
        currentPage * projectsPerPage,
        (currentPage + 1) * projectsPerPage
      );

  const handleImageError = (title) => {
    setImageSources((prev) => ({
      ...prev,
      [title]: fallbackImages[title] || placeholderImage,
    }));
  };

  // --- Pagination Controls ---
  const nextPage = () => {
    if (currentPage < totalPages - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage((prev) => prev + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage((prev) => prev - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // --- Detect Mobile Screen ---
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Reveal animation ---
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

    projectItems.current.forEach((item) => item && observer.observe(item));
    return () => projectItems.current.forEach((item) => item && observer.unobserve(item));
  }, [currentProjects]);

  if (!projectsData || projectsData.length === 0) return null;

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Projects</h2>

        <div className={styles.portfolioContainer}>
          {/* === Desktop Navigation === */}
          {!isMobile && totalPages > 1 && (
            <button
              className={`${styles.navArrow} ${styles.navArrowLeft} ${currentPage === 0 ? styles.disabled : ''}`}
              onClick={prevPage}
              disabled={currentPage === 0 || isAnimating}
              aria-label="Previous projects"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* === Projects Grid === */}
          <div className={`${styles.portfolioContent} ${isAnimating ? styles.animating : ''}`}>
            <div className={styles.portfolioGrid}>
              {currentProjects.map((project, index) => (
                <div
                  key={`${currentPage}-${index}`}
                  className={`${styles.projectCard} ${styles.glassCard}`}
                  ref={(el) => (projectItems.current[index] = el)}
                >
                  <div className={styles.projectImage}>
                    <img
                      src={imageSources[project.title] || fallbackImages[project.title] || project.image || placeholderImage}
                      alt={project.title}
                      onError={() => handleImageError(project.title)}
                      loading="lazy"
                    />
                    <div className={styles.projectOverlay}>
                      <div className={styles.projectLinks}>
                        {project.demoUrl && (
                          <a href={project.demoUrl} className={styles.demoLink} target="_blank" rel="noopener noreferrer">
                            <FaExternalLinkAlt />
                          </a>
                        )}
                        {project.repoUrl && (
                          <a href={project.repoUrl} className={styles.codeLink} target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.projectContent}>
                    <span className={styles.projectTag}>{project.category}</span>
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
                        <a href={project.demoUrl} className={styles.viewProject} target="_blank" rel="noopener noreferrer">
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                      {project.repoUrl && (
                        <a href={project.repoUrl} className={styles.viewSource} target="_blank" rel="noopener noreferrer">
                          <FaGithub /> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* === Desktop Page Indicator === */}
            {!isMobile && totalPages > 1 && (
              <div className={styles.pageIndicator}>
                <span className={styles.currentPage}>{currentPage + 1}</span>
                <span className={styles.pageSeparator}>/</span>
                <span className={styles.totalPages}>{totalPages}</span>
              </div>
            )}
          </div>

          {/* === Desktop Right Arrow === */}
          {!isMobile && totalPages > 1 && (
            <button
              className={`${styles.navArrow} ${styles.navArrowRight} ${currentPage === totalPages - 1 ? styles.disabled : ''}`}
              onClick={nextPage}
              disabled={currentPage === totalPages - 1 || isAnimating}
              aria-label="Next projects"
            >
              <FaChevronRight />
            </button>
          )}
        </div>

        {/* === Mobile “See More / See Less” Button === */}
        {isMobile && projectsData.length > 3 && (
          <div className={styles.seeMoreContainer}>
            <button
              className={styles.seeMoreButton}
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'See Less' : 'See More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
