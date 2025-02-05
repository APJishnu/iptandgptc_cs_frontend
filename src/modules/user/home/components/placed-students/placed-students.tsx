"use client";
import { useState, useEffect } from "react";
import styles from "./placed-students.module.scss";
import { UserOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

// Student Data (Dynamic in the future)
const students = [
  { 
    id: 1, 
    name: "John Doe", 
    placedAt: "Google", 
    batch: "2021", 
    profilePic: "/faculties/Baby_Saliny.jpeg",
    description: "A passionate software engineer now working at Google, specializing in AI and backend systems."
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    placedAt: "Microsoft", 
    batch: "2020", 
    profilePic: "",
    description: "Currently a software developer at Microsoft, focusing on cloud computing and enterprise solutions."
  },
  { 
    id: 3, 
    name: "Mike Johnson", 
    placedAt: "Amazon", 
    batch: "2022", 
    profilePic: "",
    description: "Software engineer at Amazon, working on large-scale distributed systems and AI technologies."
  },
  { 
    id: 4, 
    name: "Sarah Lee", 
    placedAt: "Facebook", 
    batch: "2021", 
    profilePic: "",
    description: "Front-end developer at Facebook, designing user interfaces for millions of users worldwide."
  },
];

const TRANSITION_DURATION = 3000; // 6 seconds for a full slide in-out cycle

const PlacedStudents: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % students.length);
      setIsAnimating(false);
    }, 200); // Delay for smoother transition start
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + students.length) % students.length);
      setIsAnimating(false);
    }, 200);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, TRANSITION_DURATION);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const getCardClassName = (index: number) => {
    if (index === currentIndex) {
      return `${styles.updateCard} ${styles.active}`;
    }
    return styles.updateCard;
  };

  return (

    <section className={styles.placedStudents}>
      <div className={styles.container}>
      <div className={styles.overlay}></div>
      <h2 className={styles.sectionTitle}>Our Placed Students</h2>
      <p className={styles.sectionDesc}>
        Here are some of the outstanding students who have been placed in top companies. 
        We&apos;re proud of their achievements!
      </p>
      
      <div className={styles.carouselWrapper}>
        <div className={styles.arrowDiv}>
          <button 
            className={styles.arrowButton} 
            onClick={prevSlide}
            disabled={isAnimating}
          >
            <LeftOutlined style={{ fontSize: "24px", color: "#FFF" }} />
          </button>
        </div>

        <div className={styles.cardContainer}>
          {students.map((student, index) => (
            <div 
              key={student.id} 
              className={getCardClassName(index)}
              style={{
                display: index === currentIndex ? 'block' : 'none'
              }}
            >
              <div className={styles.profilePic}>
                {student.profilePic ? (
                  <img
                    src={student.profilePic}
                    alt={student.name}
                    className={styles.image}
                  />
                ) : (
                  <UserOutlined
                    style={{
                      fontSize: "60px",
                      backgroundColor: "#d0d0d0",
                      borderRadius: "50%",
                      padding: "10px",
                      color: "#000",
                    }}
                  />
                )}
              </div>
              <div className={styles.details}>
              <h3 className={styles.studentName}>{student.name}</h3>
              <p className={styles.studentDescription}> {student.description}</p>
              <div className={styles.studentPlacedDiv}>
              <p className={styles.batch}>Batch: {student.batch}</p>
              </div>
            </div>
            </div>
          ))}
        </div>

        <div className={styles.arrowDiv}>
          <button 
            className={styles.arrowButton} 
            onClick={nextSlide}
            disabled={isAnimating}
          >
            <RightOutlined style={{ fontSize: "24px", color: "#FFF" }} />
          </button>
        </div>
      </div>

      <div className={styles.congratsContainer}>
        <h3 className={styles.congratsTitle}>🎓 Congratulations to Our Placed Students 🎓</h3>
        <p className={styles.congratsMessage}>
          We are incredibly proud of our students who have successfully secured positions in top companies.
          Your hard work, dedication, and perseverance have brought you to this milestone. May this be the beginning of an exciting and fulfilling career ahead.
        </p>
        {/* <p className={styles.congratsFooter}>
          Wishing you all continued success and excellence in your professional journey.
        </p> */}
      </div>
      </div>
    </section>
  );
};


export default PlacedStudents;
  