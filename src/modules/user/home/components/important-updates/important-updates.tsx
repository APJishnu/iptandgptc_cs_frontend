"use client"
import React, { useRef, useState } from "react";
import styles from "./important-updates.module.scss";
import { CalendarOutlined, LinkOutlined } from '@ant-design/icons'; // Import Calendar Icon
import Button from "@/themes/components/button/button";

interface UpdateItem {
  date: string;
  title: string;
  description: string;
  category: "featured-news" | "upcoming-events";
  link?: string;
}

// Updated data for updates
const updates: UpdateItem[] = [
  { date: "July 9, 2017", title: "Graduation Ceremony Highlights", description: "Highlights from the graduation ceremony showcasing the best moments, speeches, and achievements.", category: "featured-news", link: "" },
  { date: "July 9, 2017", title: "Graduation Ceremony Highlights", description: "A recap of the Graduation Ceremony, with focus on key events and speeches by prominent alumni.", category: "featured-news", link: "#" },
  { date: "August 15, 2024", title: "Independence Day Celebrations", description: "Join us for the grand celebrations of India's Independence Day with cultural performances, flag hoisting, and patriotic events.", category: "upcoming-events", link: "#apply-now" },
  { date: "September 5, 2024", title: "Teachers' Day Celebrations", description: "Celebrate Teachers' Day with special tributes, awards, and performances honoring the contributions of educators.", category: "featured-news", link: "#" },
  { date: "October 2, 2024", title: "Gandhi Jayanti Tribute Event", description: "A day of reflection and respect for Mahatma Gandhi's teachings, featuring speeches and performances.", category: "upcoming-events", link: "#apply-now" },
  { date: "December 25, 2024", title: "Christmas Eve Gathering", description: "Celebrate the spirit of Christmas with carol singing, festive activities, and a community dinner.", category: "featured-news", link: "#" },
  { date: "January 1, 2025", title: "New Year Celebration", description: "Start the new year with a bang at our New Year Celebration with music, dancing, and fireworks.", category: "upcoming-events", link: "#apply-now" }
];

const ImportantUpdates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<"featured-news" | "upcoming-events">("featured-news"); // Track the selected category
  const updatesContainerRef = useRef<HTMLDivElement>(null); // Ref for the scroll container

  // Filter updates based on the selected category
  const filteredUpdates = updates.filter(update => update.category === selectedCategory);

  const scrollLeft = () => {
    if (updatesContainerRef.current) {
      updatesContainerRef.current.scrollBy({
        left: -450, // Scroll left by the width of one card
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (updatesContainerRef.current) {
      updatesContainerRef.current.scrollBy({
        left: 450, // Scroll right by the width of one card
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.updatesSection}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Highlights</h2>
        <div className={styles.categoryButtons}>
        <Button
        className={`${styles.categoryButton} ${
          selectedCategory === "featured-news" ? styles.active : ""
        }`}
        onClick={() => setSelectedCategory("featured-news")}
        htmlType="default" // Ant Design type
      >
        Featured News
      </Button>

      <Button
        className={`${styles.categoryButton} ${
          selectedCategory === "upcoming-events" ? styles.active : ""
        }`}
        onClick={() => setSelectedCategory("upcoming-events")}
        htmlType="default" // Ant Design type
      >
        Upcoming Events
      </Button>
        </div>
      </div>
      <div className={styles.scrollContainer}>
        <div
          className={styles.updatesContainer}
          ref={updatesContainerRef} // Attach the ref to the container
        >
          {filteredUpdates.map((update, index) => (
            <div key={index} className={styles.updateCard}>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{update.title}</h3>
                <p className={styles.cardDescription}>{update.description}</p>
                <p className={styles.cardDate}><CalendarOutlined /> {update.date}</p>
                {update.link && (
                  <a href={update.link} className={styles.readMore}>
                    <LinkOutlined /> Access Link
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.scrollButtons}>
          <button className={styles.scrollArrow} onClick={scrollLeft}>
            &#8592;
          </button>
          <button className={styles.scrollArrow} onClick={scrollRight}>
            &#8594;
          </button>
        </div>
      </div>
      </section>
  );
};

export default ImportantUpdates;
