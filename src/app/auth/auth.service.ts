import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ApiResponse } from '../app.types';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BASE_URL = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private userId: string;
  private token: string;
  private tokenTimer: any;
  private loggedInStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken(): string {
    return this.token;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getIsLoggedInStatusListener() {
    return this.loggedInStatusListener.asObservable();
  }

  createUser(username: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${BASE_URL}`, { username });
  }

  login(username: string): void {
    this.http.post<ApiResponse>(`${BASE_URL}/login`, { username })
      .subscribe(
        response => {
          if (response.data && response.data.token) {
            this.token = response.data.token;
            this.userId = response.data.userId;
            this.isAuthenticated = true;

            this.setAuthTimer(response.data.expiresIn);
            this.loggedInStatusListener.next(true);
            const expirationDate = new Date(
              new Date().getTime() + response.data.expiresIn * 1000
            );

            this.saveAuthData(this.token, expirationDate, this.userId);
            this.router.navigate(['/']);
          }
        },
        error => {
          this.loggedInStatusListener.next(false);
        }
      );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.loggedInStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  getLoggedInUser() {
    return this.http.get<ApiResponse>(`${BASE_URL}/me`);
  }

  getLoggedInUserId() {
    return this.userId;
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.loggedInStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }

}
