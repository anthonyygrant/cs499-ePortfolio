import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  user: User = { name: '', email: '', role: 'travlr'};
  password = '';
  errorMessage = '';

  constructor(private authService: AuthenticationService, private router: Router) { }

  onSubmit() {
    console.log('Register button clicked');
    this.authService.register(this.user, this.password).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']); // Redirect to login
      },
      error: (error) => {
        console.log('Registration error:', error);
        this.errorMessage = error.error.message || 'Registration failed';
      }
    });
  }
}