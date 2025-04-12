import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from '../services/trip-data.service';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs'; 
import { RegisterComponent } from '../register/register.component';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService,
    private router: Router
  ) {}

  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');
    if (!out) {
      return '';
    }
    return out;
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
    console.log('Saved token:', token); 
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    console.log('isLoggedIn - Retrieved token:', token); 

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('isLoggedIn - Decoded payload:', payload); 
        console.log('isLoggedIn - Expiration time:', payload.exp); 
        console.log('isLoggedIn - Current time:', Date.now() / 1000); 
        return payload.exp > Date.now() / 1000;
      } catch (error) {
        console.error('isLoggedIn - Error decoding JWT:', error);
        return false;
      }
    } else {
      return false;
    }
  }

  public getCurrentUser(): User {
    const token: string = this.getToken();
    try {
      const { email, name, role } = JSON.parse(atob(token.split('.')[1]));
      return { email, name, role } as User;
    } catch (error) {
      console.error('getCurrentUser - Error decoding JWT:', error);
      return { email: '', name: '', role: '' };
    }
  }

  public login(user: User, passwd: string): Observable<any> {
    return this.tripDataService.login(user, passwd).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token); 
        } else {
          console.error('Login response does not contain a token:', response);
        }
      })
    );
  }

  public register(user: User, passwd: string): Observable<any> {
    return this.tripDataService.register(user, passwd);
  }
}