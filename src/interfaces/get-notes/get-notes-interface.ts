export interface Note {
  id: string; // MongoDB ObjectId
  semester: number; // Semester number
  subject: string; // Subject name
  module: string; // Module name
  description: string; // Description of the note
  file_url?: string; // File download URL (optional)
  link_url?: string; // Reference link URL (optional)
}

export interface AddNoteData {
    semester: string;
    subject: string;
    module: string;
    description: string;
    link?: string;
    file?: File; // Optional file upload
  }
  export interface GetNotesResponse {
    status: boolean;
    message: string;
    data: Note[];
    total:number;
  }
  


export interface ModuleData {
  _id: string;
  module_number: number;
  module_name: string;
}

export interface SubjectData {
  _id: string;
  name: string;
  semester: number;
  modules: ModuleData[];
}

export interface SubjectWithModulesResponse {
  status: boolean;
  message: string;
  data: SubjectData[];
}