export interface Bike {
  _id?: string;
  name?: string;
  latitude?: number;
  longitude?: number;
  rented?: boolean;
  rentedBy?: string;
}

export interface ApiResponse {
  error?: boolean;
  message?: string;
  data?: any;
}

export const BASE_URL = 'http://localhost:3000/api';
