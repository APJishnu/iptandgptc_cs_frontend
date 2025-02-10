
export interface Note {
    id?: number;
    semester: string;
    subject: string;
    module: string;
    note: string;
    downloadLink: string;
  }
export interface GetNotesResponse{
    status:boolean;
    message:string;
    data:Note[];
    total:string
}