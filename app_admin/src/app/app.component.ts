// app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { TravlrRedirectService } from './travlr-redirect.service';
import { Router, NavigationStart, RouterModule } from '@angular/router'; // Import RouterModule
import { NavbarComponent } from './navbar/navbar.component'; // Import NavbarComponent

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, NavbarComponent], // Add RouterModule and NavbarComponent to imports
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private travlrRedirectService: TravlrRedirectService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.authService.isLoggedIn() && this.authService.getCurrentUser().role === 'travlr' && event.url !== '/login') {
          this.travlrRedirectService.redirectToTravlrSite();
        }
      }
    });
  }
}