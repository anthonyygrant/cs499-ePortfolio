import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TravlrRedirectService {
  redirectToTravlrSite(): void {
    window.location.href = 'http://localhost:3000';
  }
}