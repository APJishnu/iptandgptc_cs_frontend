
import { AddNotesResponse } from "@/interfaces/admin/add-notes/add-notes-interfaces";
import http from "@/utils/http";

/**
 * UseNotesServices: Provides note-related services.
 * @returns {Object} An object containing functions to fetch and add notes.
 */
export default function UseResourcesServices() {

  /**
   * Add a new note.
   * @param {Object} noteData - The note details to be submitted.
   * @param {string} noteData.semester - Semester ID.
   * @param {string} noteData.subject - Subject ID.
   * @param {string} noteData.module - Module ID.
   * @param {string} noteData.note - Note description.
   * @param {string} [noteData.link] - Optional link.
   * @param {File} [noteData.file] - Optional file.
   * @returns {Promise<Object>} A promise resolving to the server response.
   * @throws Will throw an error if the HTTP request fails.
   */
  const addNote = async (noteData: { semester: string; subject: string; module: string; note: string; link?: string; file?: File }) : Promise<AddNotesResponse> => {
    try {
      const props: JSON = <JSON>(<unknown>{ noteData });
      const { body } = await http().post("/api/notes/add", props);
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

  return {
    addNote,
  };
}
