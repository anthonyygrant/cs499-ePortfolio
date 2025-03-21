import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-admin-site',
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css'],
  imports: [CommonModule], // Add CommonModule to imports
})
export class AdminSiteComponent {
  constructor(public authenticationService: AuthenticationService) {}
}