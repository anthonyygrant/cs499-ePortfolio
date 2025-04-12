// trip-data.service.ts
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root',
})
export class TripDataService implements OnDestroy {
  private ws: WebSocket | null = null;
  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {
    this.connectWebSocket();
  }

  ngOnDestroy(): void {
    this.disconnectWebSocket();
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private connectWebSocket(): void {
    this.ws = new WebSocket('ws://localhost:8080'); 

    this.ws.onopen = () => {
      console.log('WebSocket connection established from admin site.');
    };

    this.ws.onclose = () => {
      console.log('WebSocket connection closed from admin site.');
      setTimeout(() => this.connectWebSocket(), 3000);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error from admin site:', error);
    };
  }

  private disconnectWebSocket(): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
      this.ws = null;
    }
  }

  private sendWebSocketMessage(message: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.log('WebSocket not connected, message not sent:', message);
    }
  }

  baseUrl = 'http://localhost:3000/api';
  url = this.baseUrl + '/trips';

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData).pipe(
      takeUntil(this.ngUnsubscribe$),
      tap((newTrip) => {
        this.sendWebSocketMessage({ type: 'adminTripAdded', trip: newTrip });
      })
    );
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url + '/' + tripCode).pipe(
      takeUntil(this.ngUnsubscribe$)
    );
  }

  updateTrip(formData: Trip): Observable<Trip[]> {
    return this.http.put<Trip[]>(this.url + '/' + formData.code, formData).pipe(
      takeUntil(this.ngUnsubscribe$),
      tap((updatedTrips) => {
        if (updatedTrips && updatedTrips.length > 0) {
          this.sendWebSocketMessage({ type: 'adminTripUpdated', tripCode: formData.code, updatedTrip: updatedTrips[0] });
        }
      })
    );
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
    const deleteUrl = `${this.url}/${tripId}`;
    console.log('DELETE request to:', deleteUrl);
    return this.http.delete(deleteUrl).pipe(
      takeUntil(this.ngUnsubscribe$),
      tap(() => {
        this.sendWebSocketMessage({ type: 'adminTripDeleted', tripId: tripId });
      })
    );
  }
}