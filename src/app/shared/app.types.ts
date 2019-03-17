export interface Bike {
  _id?: string;
  name?: string;
  latitude?: number;
  longitude?: number;
  rented?: boolean;
  rentedBy?: string;
  [key: string]: any;
}

export interface ApiResponse {
  error?: boolean;
  message?: string;
  data?: any;
}
