export interface Bike {
  _id?: string;
  name?: string;
  latitude?: number;
  longitude?: number;
  rented?: boolean;
  [key: string]: any;
}
