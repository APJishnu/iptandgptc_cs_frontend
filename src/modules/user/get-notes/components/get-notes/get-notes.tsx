"use client";
import React, { useState } from "react";
import GetNotesForm from "../get-notes-form/get-notes-form";
import NotesList from "../notes-list/notes-list";
import styles from "./get-notes.module.scss";

interface Note {
  id: number;
  semester: string;
  subject: string;
  module: string;
  note: string;
  downloadLink: string;
}

interface Filters {
  semester: string[];
  subject: string[];
  module: string[];
}

const GetNotes: React.FC = () => {
    const [notes] = useState<Note[]>([
        { 
          id: 1, 
          semester: "Semester 1", 
          subject: "Mathematics", 
          module: "Algebra", 
          note: "Basic algebra concepts", 
          downloadLink: "/notes/algebra.pdf" 
        },
        { 
          id: 2, 
          semester: "Semester 2", 
          subject: "Physics", 
          module: "Mechanics", 
          note: "Newton's laws", 
          downloadLink: "/notes/mechanics.pdf" 
        },
        { 
          id: 3, 
          semester: "Semester 3", 
          subject: "Computer Science", 
          module: "Data Structures", 
          note: "Introduction to arrays", 
          downloadLink: "/notes/data-structures.pdf" 
        },
        { 
          id: 4, 
          semester: "Semester 1", 
          subject: "Mathematics", 
          module: "Geometry", 
          note: "Basic Geometry principles", 
          downloadLink: "/notes/geometry.pdf" 
        },
      ]);

  const [filters, setFilters] = useState<Filters>({
    semester: [],
    subject: [],
    module: [],
  });

  // Function to update filters from GetNotesForm
  const handleFilter = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  // Filter notes based on dropdown selections
  const filteredNotes = notes.filter(
    (note) =>
      (filters.semester.length === 0 || filters.semester.includes(note.semester)) &&
      (filters.subject.length === 0 || filters.subject.includes(note.subject)) &&
      (filters.module.length === 0 || filters.module.includes(note.module))
  );

  return (
    <div className={styles.getNotesContainer}>
        <div className={styles.banner}>
        <h1>Get Notes</h1>
      </div>
      <div className={styles.flexAlign}>
      <div className={styles.getNotesContent}>
      <GetNotesForm getNote={handleFilter} />
      <NotesList notes={filteredNotes} />
      </div>
      </div>
    </div>
  );
};

export default GetNotes;
