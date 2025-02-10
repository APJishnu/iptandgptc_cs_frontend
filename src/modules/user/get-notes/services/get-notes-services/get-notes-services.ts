
import { GetNotesResponse } from "@/interfaces/get-notes/get-notes-interface";
import http from "@/utils/http";

/**
 * UseNotesServices: Provides note-related services.
 * @returns {Object} An object containing functions to fetch and add notes.
 */
export default function UseNotesServices() {
  
    /**
     * Fetch all notes with optional filtering by semester, subject, and module.
     * @param {Object} filters - Filters for retrieving notes.
     * @param {string[]} filters.semester - Filter by semester.
     * @param {string[]} filters.subject - Filter by subject.
     * @param {string[]} filters.module - Filter by module.
     * @returns {Promise<GetNotesResponse>} A promise that resolves to a NotesResponse object.
     * @throws Will throw an error if the HTTP request fails.
     */
    const fetchNotes = async (filters: { semester?: string[], subject?: string[], module?: string[] }): Promise<GetNotesResponse> => {
        try {
            const props: JSON = <JSON>(<unknown>{ filters });
            const { body } = await http().post("/api/notes/list", props);
            return {
                status: body.status,
                message: body.message,
                data: body.data,
                total:body.totalItems
            };
        } catch (error) {
            console.error("Error fetching notes:", error);
            throw error;
        }
    };

    
    return {
        fetchNotes,
    };
}
