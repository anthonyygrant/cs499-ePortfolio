import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('AuthGuardService - canActivate called for:', state.url);
    console.log('AuthGuardService - isLoggedIn:', this.auth.isLoggedIn());
  
    if (!this.auth.isLoggedIn()) {
      console.log('AuthGuardService - User is NOT logged in, redirecting to /login');
      this.router.navigate(['login']);
      return false;
    }
  
    const expectedRole = route.data['expectedRole'];
    const userRole = this.auth.getCurrentUser()?.role; 
  
    console.log('AuthGuardService - expectedRole:', expectedRole);
    console.log('AuthGuardService - userRole:', userRole);
  
    if (!expectedRole || userRole === expectedRole) {
      console.log('AuthGuardService - Access granted for:', state.url);
      return true;
    } else {
      console.log('AuthGuardService - Role mismatch, redirecting to /');
      this.router.navigate(['/']);
      return false;
    }
  }
}