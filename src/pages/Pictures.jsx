import React, { useEffect, useRef, useState } from 'react';
import styles from './Pictures.module.css';
import picturesData from '../database/picturesData.json'; 

import mosjidImage from '../assets/picturesImg/Mosjid.jpg';
import gorundImage from '../assets/picturesImg/gorund.jpg';
import urbanImage from '../assets/picturesImg/urban.jpg';

const imageMap = {
  "Beautiful Mosque – Night View": mosjidImage,
  "University Ground": gorundImage,
  "Urban Architecture": urbanImage,
};

const Pictures = () => {
  const pictureItems = useRef([]);
  const [selectedImage, setSelectedImage] = useState(null); // For modal

  useEffect(() => {
    const currentItems = pictureItems.current.filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    currentItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const dataToDisplay = picturesData.filter(pic => imageMap[pic.title]);
  if (dataToDisplay.length === 0) return null;

  return (
    <section id="pictures" className={styles.pictures}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Photography</h2>

        <div className={styles.picturesGrid}>
          {dataToDisplay.map((picture, index) => (
            <div
              key={index}
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

                {/* View full-size button opens modal */}
                <button
                  className={styles.viewPicture}
                  onClick={() => setSelectedImage(imageMap[picture.title])}
                >
                  View Full Size <i className="fa-solid fa-up-right-from-square"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL SECTION */}
      {selectedImage && (
        <div className={styles.modalOverlay} onClick={() => setSelectedImage(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedImage(null)}
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
