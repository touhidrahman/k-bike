import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Bike } from './app.types';


export interface ApiResponse {
  error: boolean;
  message: string;
  data: any;
}

export const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getBikes(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${BASE_URL}/bikes`);
  }

  createBike(bike: Bike): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${BASE_URL}/bike/new`, bike);
  }

  getBikeById(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${BASE_URL}/bike/${id}`);
  }

  deleteBike(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${BASE_URL}/bike/${id}`);
  }

  updateBike(id: string, bike: Bike): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${BASE_URL}/bike/${id}`, bike);
  }

  getLoggedInUser(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${BASE_URL}/me`);
  }

  getCurrentlyRentedBike(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${BASE_URL}/my-bike`);
  }

  rentBike(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${BASE_URL}/rent-bike/${id}`);
  }

  returnBike(id: string, latitude: number, longitude: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${BASE_URL}/return-bike/${id}`, {latitude, longitude});
  }

  login(username: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${BASE_URL}/login`, username);
  }

  logout(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${BASE_URL}/logout`);
  }
}
