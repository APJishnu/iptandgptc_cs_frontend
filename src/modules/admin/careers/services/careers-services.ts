import { EventData, EventResponse, GetEventResponse } from "@/interfaces/admin/add-events/add-events-interfaces";
import http from "@/utils/http";

/**
 * UseEventServices: Provides services for event-related operations.
 * @returns {Object} An object containing the addEvent function.
 */
export default function UseEventServices() {
  /**
   * Add a new event.
   * @param {EventData} event - Event details.
   * @returns {Promise<EventResponse>} A promise resolving to the event response.
   */
  const addEvent = async (event: EventData): Promise<EventResponse> => {
    try {
      const props :JSON = <JSON>(<unknown>{event});
      console.log(props)
      const { body } = await http().post("/api/admin/add-event", props);

        return {
          status: body.status,
          message: body.message,
          event: body.event,
          errors: body.errors || [],
        };
    } catch (error: any) {
      console.error("Event creation failed:", error);
      return {
        status: false,
        message: "Network error or server issue",
        errors: [{ field: "server", message: "Unable to connect. Please try again later." }],
      };
    }
  };

  /**
   * Fetch all events.
   * @returns {Promise<EventData[]>} A promise resolving to an array of events.
   */
  const getEvents = async (): Promise<GetEventResponse> => {
    try {
      const { body } = await http().post("/api/admin/get-all-events");
      return {
        status: body.status,
        message: body.message,
        data: body.data,
      };
    } catch (error: any) {
      console.error("Fetching events failed:", error);
      return {
        status: false,
        message: "Network error or server issue",
        data:[]
      };
    }
  };

  return {
    addEvent,
    getEvents,
  };
}
