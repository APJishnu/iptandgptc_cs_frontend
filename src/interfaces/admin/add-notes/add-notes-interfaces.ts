import { Note } from "@/interfaces/get-notes/get-notes-interface";


export interface ValidationError{
    field: string;
    message: string;
}
export interface AddNotesResponse{
    status:boolean;
    message:string;
    data:Note[];
    errors?:ValidationError[]
}