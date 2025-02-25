import { GetEventDataResponse } from "@/interfaces/user/get-events/get-events-interfaces";
import http from "@/utils/http";


export default function UseEventsService() {
    /**
     * Fetch events from the backend, filtered by category.
     * @param {string} key - The category key to filter events (e.g., "featured-news" or "upcoming-events").
     * @returns {Promise<GetEventDataResponse>} - A promise that resolves to filtered event objects.
     */
    const fetchEvents = async (key: string): Promise<GetEventDataResponse> => {
      try {
        const props: JSON = <JSON>(<unknown> { category: key });

        const { body } = await http().post("/api/user/events", props);  // Send category as key
        return {
          status: body.status,
          message: body.message,
          data: body.data, // Backend should return only filtered events
        };
      } catch (error) {
        console.error("Failed to fetch events:", error);
        throw error;
      }
    };
  
    return { fetchEvents };
  }
  