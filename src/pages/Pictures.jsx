import React, { useEffect, useRef, useState, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import styles from './Pictures.module.css';
import picturesData from '../database/picturesData.json';

// --- Image Imports ---
import mosjidImage from '../assets/picturesImg/Mosjid.jpg';
import gorundImage from '../assets/picturesImg/gorund.jpg';
import urbanImage from '../assets/picturesImg/urban.jpg';

const imageMap = {
  "Beautiful Mosque – Night View": mosjidImage,
  "University Ground": gorundImage,
  "Urban Architecture": urbanImage,
};

// Configuration constants
const DESKTOP_PICTURES_PER_PAGE = 3;
const MOBILE_PICTURES_INITIAL_COUNT = 3;
const MOBILE_BREAKPOINT = 768;
const ANIMATION_DURATION = 500;

const Pictures = () => {
  const pictureItems = useRef([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Filter data once to only include items with valid image imports
  const dataToDisplay = useMemo(() => {
    return picturesData.filter(pic => imageMap[pic.title]);
  }, []);

  // --- Pagination setup ---
  const totalPages = Math.ceil(dataToDisplay.length / DESKTOP_PICTURES_PER_PAGE);

  const currentPictures = isMobile
    ? showAll
      ? dataToDisplay
      : dataToDisplay.slice(0, MOBILE_PICTURES_INITIAL_COUNT)
    : dataToDisplay.slice(
        currentPage * DESKTOP_PICTURES_PER_PAGE,
        (currentPage + 1) * DESKTOP_PICTURES_PER_PAGE
      );

  // --- Pagination Controls ---
  const nextPage = () => {
    if (currentPage < totalPages - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage((prev) => prev + 1);
      setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage((prev) => prev - 1);
      setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
    }
  };

  // --- Detect Mobile Screen ---
  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(isCurrentlyMobile);
      
      // Reset logic when switching from mobile to desktop or vice-versa
      if (isCurrentlyMobile !== isMobile) {
        setCurrentPage(0);
        setShowAll(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

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
      { threshold: 0.1 }
    );

    pictureItems.current = pictureItems.current.slice(0, currentPictures.length);
    pictureItems.current.filter(Boolean).forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [currentPictures]); 

  if (dataToDisplay.length === 0) return null;

  return (
    <section id="pictures" className={styles.pictures}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Timeless Frames</h2>

        <div className={styles.portfolioContainer}>
          {/* === Desktop Navigation - Left Arrow === */}
          {!isMobile && totalPages > 1 && (
            <button
              className={`${styles.navArrow} ${styles.navArrowLeft} ${currentPage === 0 ? styles.disabled : ''}`}
              onClick={prevPage}
              disabled={currentPage === 0 || isAnimating}
              aria-label="Previous pictures"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* === Pictures Grid and Pagination Content === */}
          <div className={`${styles.portfolioContent} ${isAnimating ? styles.animating : ''}`}>
            <div className={styles.picturesGrid}>
              {currentPictures.map((picture, index) => (
                <div
                  key={`${isMobile ? 'mobile' : currentPage}-${index}`}
                  className={`${styles.pictureCard} ${styles.glassCard}`}
                  ref={(el) => (pictureItems.current[index] = el)} 
                >
                  <div className={styles.pictureImage}>
                    <img
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

                    <button
                      className={styles.viewPicture}
                      onClick={() => setSelectedImage(imageMap[picture.title])}
                      aria-label={`View full size of ${picture.title}`}
                    >
                      View Full Size <i className="fa-solid fa-up-right-from-square"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* === Desktop Page Indicator === */}
            
          </div>

          {/* === Desktop Navigation - Right Arrow === */}
          {!isMobile && totalPages > 1 && (
            <button
              className={`${styles.navArrow} ${styles.navArrowRight} ${currentPage === totalPages - 1 ? styles.disabled : ''}`}
              onClick={nextPage}
              disabled={currentPage === totalPages - 1 || isAnimating}
              aria-label="Next pictures"
            >
              <FaChevronRight />
            </button>
            
          )}
        </div>

        {/* === Mobile "See More / See Less" Button === */}
        {isMobile && dataToDisplay.length > MOBILE_PICTURES_INITIAL_COUNT && (
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

      {/* MODAL SECTION */}
      {selectedImage && (
        <div className={styles.modalOverlay} onClick={() => setSelectedImage(null)}>
          <div
            className={styles.modalContent}
            role="dialog"
            aria-modal="true"
            aria-label="Full size image view"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedImage(null)}
              aria-label="Close image view"
            >
              &times;
            </button>
            <img src={selectedImage} alt="Full size" className={styles.modalImage} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Pictures;