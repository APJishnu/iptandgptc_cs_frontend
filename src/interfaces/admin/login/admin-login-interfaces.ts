export interface AdminLoginValues {
    email: string;
    password: string;
  }

  export interface ValidationError {
    field : string;
    message : string;
  }
  
  export interface AdminLoginResponse {
    status: boolean;
    message: string;
    token?: string;
    errors?:ValidationError[];
  }
  