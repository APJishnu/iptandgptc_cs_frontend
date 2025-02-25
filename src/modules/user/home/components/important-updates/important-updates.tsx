"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./important-updates.module.scss";
import { CalendarOutlined, LinkOutlined } from "@ant-design/icons";
import Button from "@/themes/components/button/button";
import UseEventsService from "../../services/user-services";
import { EventData } from "@/interfaces/admin/add-events/add-events-interfaces";
import { Empty } from "antd";

const ImportantUpdates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "featured-news" | "upcoming-events"
  >("featured-news");
  const [updates, setUpdates] = useState<EventData[]>([]);
  const updatesContainerRef = useRef<HTMLDivElement>(null);

  const getEvents = async (category: string) => {
    try {
      const response = await UseEventsService().fetchEvents(category);
      setUpdates(response.data); // Data is already filtered by backend
    } catch (error) {
      console.error("Error fetching updates:", error);
    }
  };

  // Fetch events when the component mounts & when category changes
  useEffect(() => {
    getEvents(selectedCategory);
  }, [selectedCategory]);

  const scrollLeft = () => {
    updatesContainerRef.current?.scrollBy({ left: -450, behavior: "smooth" });
  };

  const scrollRight = () => {
    updatesContainerRef.current?.scrollBy({ left: 450, behavior: "smooth" });
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
            htmlType="default"
          >
            Featured News
          </Button>
          <Button
            className={`${styles.categoryButton} ${
              selectedCategory === "upcoming-events" ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory("upcoming-events")}
            htmlType="default"
          >
            Upcoming Events
          </Button>
        </div>
      </div>
      <div className={styles.scrollContainer}>
        <div className={styles.updatesContainer} ref={updatesContainerRef}>
          {updates?.length > 0 ? (
            updates.map((update, index) => (
              <div key={index} className={styles.updateCard}>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{update.title}</h3>
                  <p className={styles.cardDescription}>{update.description}</p>
                  <p className={styles.cardDate}>
                    <CalendarOutlined /> {update.startDate}
                  </p>
                  {update.link && (
                    <a href={update.link} className={styles.readMore}>
                      <LinkOutlined /> Access Link
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.empty}>
            <Empty description="No Data Available" />
            </div>
          )}
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
