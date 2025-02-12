import React from "react";
import About from "../components/about/about";
import Hero from "../components/hero/hero";
import ImportantUpdates from "../components/important-updates/important-updates";
import MeetOurFaculty from "../components/meet-out-faculty/meet-out-faculty";
import PlacedStudents from "../components/placed-students/placed-students";
import FloatingDownload from "@/themes/components/floating-download/floating-download";

const HomeView: React.FC = () => {
 
  return (
   
        <>
          <div id="hero"><Hero /></div>
          <div id="about"><About /></div>
          <div id="updates"><ImportantUpdates /></div>
          <div id="faculty"><MeetOurFaculty /></div>
          <div id="placements"><PlacedStudents /></div>
          <FloatingDownload />

        </>
  
  );
};

export default HomeView;
