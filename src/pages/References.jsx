import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaPhone, FaEnvelope, FaCopy, FaTimes } from 'react-icons/fa';
import styles from './References.module.css';
import referencesData from '../database/referencesData.json';

// Fallback images
import raimaImage from '../assets/referenceImg/raima-dcosta.jpg';
import michaelImage from '../assets/referenceImg/michael-chen.jpg';
import sarahImage from '../assets/referenceImg/sarah-johnson.jpg';
import alexImage from '../assets/referenceImg/alex-rodriguez.jpg';
import placeholderImage from '../assets/referenceImg/placeholderImage.jpeg';

const References = () => {
  const referenceItems = useRef([]);
  const [imageSources, setImageSources] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // New state for Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [copyStatus, setCopyStatus] = useState({ state: '', item: '' }); // State for copy notification

  const fallbackImages = {
    "Raima D'costa": raimaImage,
    "Michael Chen": michaelImage,
    "Dr. Sarah Johnson": sarahImage,
    "Alex Rodriguez": alexImage
  };

  const referencesPerPage = 2;
  const totalPages = Math.ceil(referencesData.length / referencesPerPage);

  const currentReferences = isMobile
    ? showAll
      ? referencesData
      : referencesData.slice(0, 2)
    : referencesData.slice(
        currentPage * referencesPerPage,
        (currentPage + 1) * referencesPerPage
      );

  const handleImageError = (name) => {
    setImageSources((prev) => ({
      ...prev,
      [name]: fallbackImages[name] || placeholderImage
    }));
  };

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

  const goToPage = (pageIndex) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentPage(pageIndex);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // --- Modal Functions ---
  const openModal = (reference) => {
    setModalContent(reference);
    setModalOpen(true);
    setCopyStatus({ state: '', item: '' }); // Reset copy status
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
    setCopyStatus({ state: '', item: '' });
  };
  
  // Function to copy text to clipboard
  const copyToClipboard = (text, type) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    setCopyStatus({ state: 'success', item: type });

    setTimeout(() => {
      setCopyStatus({ state: '', item: '' });
    }, 1500);
  };
  // --- End Modal Functions ---

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.revealed);
        });
      },
      { threshold: 0.1 }
    );

    // Filter out nulls/undefined for items from the ref array
    const items = referenceItems.current.filter(el => el != null); 
    items.forEach((item) => observer.observe(item));

    return () => items.forEach((item) => observer.unobserve(item));
  }, [currentPage, showAll]);

  if (referencesData.length === 0) return null;

  // --- Modal JSX Component ---
  const ContactModal = () => {
    if (!modalOpen || !modalContent) return null;

    const { name, email, phone, company, position } = modalContent;

    return (
      <div className={styles.modalBackdrop} onClick={closeModal}>
        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
          <button className={styles.modalCloseButton} onClick={closeModal} aria-label="Close">
            <FaTimes />
          </button>
          
          <h3 className={styles.modalTitle}>Contact {name}</h3>
          <p className={styles.modalSubtitleInContact}>{position} at {company}</p>

          {/* Email Contact Item */}
          <div className={styles.contactItem}>
            <FaEnvelope className={styles.contactIcon} />
            <div className={styles.contactDetails}>
              <span className={styles.contactLabel}>Email:</span>
              <a href={`mailto:${email}`} className={styles.contactValue}>{email}</a>
            </div>
            <button 
              className={styles.copyButton} 
              onClick={() => copyToClipboard(email, 'email')}
              aria-label="Copy Email"
            >
              <FaCopy />
            </button>
          </div>

          {/* Phone Contact Item */}
          <div className={styles.contactItem}>
            <FaPhone className={styles.contactIcon} />
            <div className={styles.contactDetails}>
              <span className={styles.contactLabel}>Phone:</span>
              <a href={`tel:${phone}`} className={styles.contactValue}>{phone}</a>
            </div>
            <button 
              className={styles.copyButton} 
              onClick={() => copyToClipboard(phone, 'phone number')}
              aria-label="Copy Phone Number"
            >
              <FaCopy />
            </button>
          </div>
          
          {/* Copy Notification (positioned globally by CSS) */}
          {copyStatus.state === 'success' && (
            <div className={styles.copyNotification}>
              Copied {copyStatus.item}!
            </div>
          )}
        </div>
      </div>
    );
  };
  // --- End Modal JSX Component ---


  return (
    <section id="references" className={styles.references}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>References</h2>

        <div className={`${styles.referencesContainer} ${isAnimating ? styles.animating : ''}`}>
          <div className={styles.referencesGrid}>
            {currentReferences.map((reference, index) => (
              <div
                key={`${currentPage}-${index}`}
                className={`${styles.referenceCard} ${styles.glassCard}`}
                ref={(el) => (referenceItems.current[index] = el)}
              >
                {/* Contact Button added to top right */}
                <button 
                    className={styles.contactButton} 
                    onClick={() => openModal(reference)}
                    aria-label={`Contact ${reference.name}`}
                >
                    <FaPhone /> Contact
                </button>
                
                <div className={styles.refHeader}>
                  <div className={styles.referenceImage}>
                    <img
                      src={
                        imageSources[reference.name] ||
                        reference.image ||
                        fallbackImages[reference.name] ||
                        placeholderImage
                      }
                      alt={reference.name}
                      onError={() => handleImageError(reference.name)}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.refInfo}>
                    <h3>{reference.name}</h3>
                    <p className={styles.refPosition}>{reference.position}</p>
                    <p className={styles.refCompany}>
                      @{' '}
                      <a
                        href={reference.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {reference.company}
                      </a>
                    </p>
                  </div>
                </div>

                <div className={styles.quote}>
                  <p>"{reference.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Pagination and Mobile See More... (rest of the component) */}
        {!isMobile && totalPages > 1 && (
          <>
            <div className={styles.pagination}>
              <button
                className={`${styles.paginationButton} ${currentPage === 0 ? styles.disabled : ''}`}
                onClick={prevPage}
                disabled={currentPage === 0 || isAnimating}
                aria-label="Previous page"
              >
                <FaChevronLeft />
              </button>

              <div className={styles.paginationDots}>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`${styles.paginationDot} ${currentPage === index ? styles.active : ''}`}
                    onClick={() => goToPage(index)}
                    disabled={isAnimating}
                  />
                ))}
              </div>

              <button
                className={`${styles.paginationButton} ${currentPage === totalPages - 1 ? styles.disabled : ''}`}
                onClick={nextPage}
                disabled={currentPage === totalPages - 1 || isAnimating}
                aria-label="Next page"
              >
                <FaChevronRight />
              </button>
            </div>

            
          </>
        )}

        {/* Mobile "See More / See Less" */}
        {isMobile && referencesData.length > 2 && (
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
      
      {/* Render the Modal */}
      <ContactModal />
    </section>
  );
};

export default References;
