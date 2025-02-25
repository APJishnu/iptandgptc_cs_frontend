"use client";

import React, { useState, useEffect, useRef } from "react";
import TabComponent from "@/themes/admin/components/tabs/tabs";
import Button from "@/themes/components/button/button";
import { message } from "antd";
import AddEventModal from "../add-event-modal/add-event-modal";
import styles from "./careers-tabs.module.scss";
import EventsTable from "../events-table/events-table";
import UseEventServices from "../../services/careers-services";
import { EventData } from "@/interfaces/admin/add-events/add-events-interfaces";

const CareersTabs: React.FC = () => {
  const [activeKey, setActiveKey] = useState("events");
  const [eventOpen, setEventOpen] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  const fetched = useRef(false); 

  const fetchEvents = async () => {
    try {
      const response = await UseEventServices().getEvents();
      if (response.status) {
        setEvents(response.data);
        message.success("Events loaded successfully");
      } else {
        message.error("Failed to load events");
      }
    } catch (error) {
      message.error("Error fetching events");
    }
  };

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true; // Set to true after first execution
      fetchEvents();
    }
  }, []);

  const handleClick = (key: string) => {
    if (key === "students") {
      message.warning("students clicked");
    } else {
      setEventOpen(true);
    }
  };

  const handleClose = () => {
    setEventOpen(false);
    fetchEvents(); // Refresh events after adding a new one
  };

  const tabHeadings = [
    {
      key: "students",
      label: "Placed Students",
      content: <></>,
    },
    {
      key: "events",
      label: "Events",
      content: <EventsTable events={events} />, // Pass fetched events as props
    },
  ];

  return (
    <div className={styles.careersDiv}>
      <TabComponent
        headings={tabHeadings}
        activeKey={activeKey}
        onChange={setActiveKey}
        subHeading={
          <Button
            label={activeKey === "students" ? "add student" : "add event"}
            onClick={() => handleClick(activeKey)}
            className={styles.activeBtn}
          />
        }
      />
      <AddEventModal open={eventOpen} onClose={handleClose} />
    </div>
  );
};

export default CareersTabs;
