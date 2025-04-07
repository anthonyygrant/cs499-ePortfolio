// trip-data.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  baseUrl = 'http://localhost:3000/api';
  url = this.baseUrl + '/trips';

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  updateTrip(formData: Trip): Observable<Trip[]> {
    return this.http.put<Trip[]>(this.url + '/' + formData.code, formData);
  }

  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd, user.role);
  }

  handleAuthAPICall(
    endpoint: string,
    user: User,
    passwd: string,
    role?: string
  ): Observable<AuthResponse> {
    let formData: any = {
      name: user.name,
      email: user.email,
      password: passwd,
    };

    if (role) {
      formData.role = role;
    }

    return this.http.post<AuthResponse>(
      this.baseUrl + '/' + endpoint,
      formData
    );
  }

  deleteTrip(tripId: string): Observable<any> {
    const deleteUrl = `${this.url}/${tripId}`; // Corrected URL construction
    console.log('DELETE request to:', deleteUrl);
    return this.http.delete(deleteUrl);
  }
}