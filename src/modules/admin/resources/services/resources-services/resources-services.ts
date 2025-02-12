
import { AddNotesResponse } from "@/interfaces/admin/add-notes/add-notes-interfaces";
import { AddNoteData, GetNotesResponse, SubjectWithModulesResponse } from "@/interfaces/get-notes/get-notes-interface";
import http from "@/utils/http";

/**
 * UseNotesServices: Provides note-related services.
 * @returns {Object} An object containing functions to fetch and add notes.
 */
export default function UseResourcesServices() {

  /**
   * Fetch subjects with modules from the backend.
   * @returns {Promise<SubjectWithModulesResponse>} A promise resolving to the fetched subjects.
   * @throws Will throw an error if the HTTP request fails.
   */
  const getSubjectsWithModules = async (): Promise<SubjectWithModulesResponse> => {
    try {
      const props: JSON = <JSON>(<unknown>{}); // Ensure consistency with addNote
      const { body } = await http().post("/api/admin/subjects-with-modules", props);
      return {
        status: body.status,
        message: body.message,
        data: body.data,
      };
    } catch (error) {
      console.error("Error fetching subjects with modules:", error);
      throw error;
    }
  };


  /**
   * Add a new note.
   * @param {Object} noteData - The note details to be submitted.
   * @param {string} noteData.semester - Semester ID.
   * @param {string} noteData.subject - Subject ID.
   * @param {string} noteData.module - Module ID.
   * @param {string} noteData.description - Note description.
   * @param {string} [noteData.link] - Optional link.
   * @param {File} [noteData.file] - Optional file.
   * @returns {Promise<Object>} A promise resolving to the server response.
   * @throws Will throw an error if the HTTP request fails.
   */
  const addNote = async (noteData: AddNoteData) : Promise<AddNotesResponse> => {

    try {
      const hasFile = !!noteData.file; 
      const props: JSON = <JSON>(<unknown> noteData);
      console.log(props)
      const { body } = await http().post("/api/admin/add-notes", props , hasFile);
      return {
        status: body.status,
        message: body.message,
        data: body.data,
        errors:body.errors
      };
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  };


   /**
   * Fetch all notes from the backend.
   * @returns {Promise<NotesResponse>} A promise resolving to the fetched notes.
   */
   const getAllNotes = async (): Promise<GetNotesResponse> => {
    try {
      const { body } = await http().post("/api/admin/get-notes");
      return body; // Directly return the response
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  };

  return {
   
    getSubjectsWithModules,
    addNote,
    getAllNotes,
  };
}
