export interface EventData {
    id?:string;
    category: string;
    title: string;
    description?: string;
    link?:string;
    startDate: string;
    endDate?: string;
  }
  
  export interface ValidationError {
    field: string;
    message: string;
  }
  
  export interface EventResponse {
    status: boolean;
    message: string;
    event?: EventData;
    errors?: ValidationError[];
  }
  
  
  export interface GetEventResponse {
    status: boolean;
    message: string;
    data: EventData[];
  }

  