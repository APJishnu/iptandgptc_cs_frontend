"use client";
import React, { useState, useEffect } from "react";
import About from "../components/about/about";
import Hero from "../components/hero/hero";
import ImportantUpdates from "../components/important-updates/important-updates";
import MeetOurFaculty from "../components/meet-out-faculty/meet-out-faculty";
import PlacedStudents from "../components/placed-students/placed-students";
import Loader from "@/themes/components/loader/loader";

const HomeView: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading time (for demo purposes, you can remove this in production)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // Simulate a loading state for 2 seconds
  }, []);
  return (
    <>
      {loading ? (
        <Loader /> // Show the loader while loading
      ) : (
        <>
          <div id="hero"><Hero /></div>
          <div id="about"><About /></div>
          <div id="updates"><ImportantUpdates /></div>
          <div id="faculty"><MeetOurFaculty /></div>
          <div id="placements"><PlacedStudents /></div>
        </>
      )}
    </>
  );
};

export default HomeView;
