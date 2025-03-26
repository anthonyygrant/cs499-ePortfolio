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
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }

    const expectedRole = route.data['expectedRole'];
    const userRole = this.auth.getCurrentUser().role;

    if (!expectedRole || userRole === expectedRole) {
      return true;
    } else {
      // Redirect to the main page or an unauthorized page
      this.router.navigate(['/']); // Redirect to the root path
      return false;
    }
  }
}