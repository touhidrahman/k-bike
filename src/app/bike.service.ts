import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of, Observable, Subject } from 'rxjs';
import { Bike, ApiResponse } from './app.types';
import { environment } from '../environments/environment';

const BASE_URL = environment.apiUrl + '/bikes';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  private bikes: Array<Bike>;
  private bikesUpdated = new Subject<{ bikes: Array<Bike> }>();

  constructor(private http: HttpClient) { }

  getBikes() {
    this.http.get<ApiResponse>(`${BASE_URL}`)
      .pipe(
        map(responseData => {
          return {
            bikes: responseData.data,
          };
        }),
      )
      .subscribe(transformedData => {
        this.bikes = transformedData.bikes;
        this.bikesUpdated.next({
          bikes: [...this.bikes]
        });
      });
  }

  getBikesUpdatedListener() {
    return this.bikesUpdated.asObservable();
  }

  createBike(bike: Bike): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${BASE_URL}`, bike);
  }

  getBikeById(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${BASE_URL}/${id}`);
  }

  deleteBike(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${BASE_URL}/${id}`);
  }

  getCurrentlyRentedBike(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${BASE_URL}/my-bike`);
  }

  rentBike(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${BASE_URL}/rent/${id}`);
  }

  returnBike(id: string, latitude: number, longitude: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${BASE_URL}/return/${id}`, { latitude, longitude });
  }
}
