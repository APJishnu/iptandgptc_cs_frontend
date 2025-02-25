import { EventData } from "@/interfaces/admin/add-events/add-events-interfaces";

export interface GetEventDataResponse{
    status:boolean;
    message:string;
    data:EventData[];
}
  