import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Bike, ApiResponse, BASE_URL } from './app.types';

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
    return this.http.post<ApiResponse>(`${BASE_URL}/bikes`, bike);
  }

  getBikeById(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${BASE_URL}/bikes/${id}`);
  }

  deleteBike(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${BASE_URL}/bikes/${id}`);
  }

  getCurrentlyRentedBike(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${BASE_URL}/bikes/my-bike`);
  }

  rentBike(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${BASE_URL}/bikes/rent/${id}`);
  }

  returnBike(id: string, latitude: number, longitude: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${BASE_URL}/bikes/return/${id}`, { latitude, longitude });
  }
}
