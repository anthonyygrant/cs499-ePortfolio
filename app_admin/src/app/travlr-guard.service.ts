// travlr-guard.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { TravlrRedirectService } from "./travlr-redirect.service";

@Injectable({
  providedIn: 'root'
})
export class TravlrGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private travlrRedirectService: TravlrRedirectService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isLoggedIn() && this.auth.getCurrentUser().role === 'travlr') {
        this.travlrRedirectService.redirectToTravlrSite();
        return false;
    }
    return true;
  }
}