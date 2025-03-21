// navbar.component.ts
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule], // Add CommonModule to imports
})
export class NavbarComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getAuthService(): AuthenticationService {
    return this.authenticationService;
  }
}