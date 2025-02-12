"use client";
import React, { useEffect, useState } from "react";
import GetNotesForm from "../get-notes-form/get-notes-form";
import NotesList from "../notes-list/notes-list";
import styles from "./get-notes.module.scss";
import { Note } from "@/interfaces/get-notes/get-notes-interface";
import UseNotesServices from "../../services/get-notes-services/get-notes-services";
import PaginationComponent from "@/themes/components/pagination-button/pagination-button";
import Loader from "@/themes/components/loader/loader";

interface Filters {
  semester: number[];
  subject: string[];
  module: string[];
}

const GetNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filters, setFilters] = useState<Filters>({
    semester: [],
    subject: [],
    module: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Default page size
  const [totalNotes, setTotalNotes] = useState(0);
  const [loading, setLoading] = useState(true);

  const getFilteredNotes = async () => {
    try {
      setNotes([]);

      const response = await UseNotesServices().fetchNotes({
        ...filters,
        page: currentPage,
        limit: pageSize,
      });
      if (response.status) {
        setNotes(response.data);
        setTotalNotes(response.total);
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFilteredNotes();
  }, [filters, currentPage, pageSize]);

  const handleFilter = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.getNotesContainer}>
      <div className={styles.banner}>
        <h1>Get Notes</h1>
      </div>
      <div className={styles.flexAlign}>
        <div className={styles.getNotesContent}>
          <GetNotesForm getNote={handleFilter} />
          <div className={loading ?`${styles.tableContainerLoading}`:`${styles.tableContainer}`}>
            {loading ? (
              <Loader />
            ) : (
              <>
                <NotesList notes={notes} />
                <PaginationComponent
                  total={totalNotes}
                  pageSize={pageSize}
                  current={currentPage}
                  onChange={(page) => setCurrentPage(page)}
                  loading={loading}
                  className={styles.pagination}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetNotes;
