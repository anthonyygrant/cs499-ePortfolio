// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  public formError: string = '';
  credentials = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'Email and password are required, please try again';
    } else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    let newUser = {
      email: this.credentials.email,
    } as User;

    this.authenticationService.login(newUser, this.credentials.password).subscribe({
      next: (value: any) => {
        if (this.authenticationService.isLoggedIn()) {
          const role = this.authenticationService.getCurrentUser().role;
          if (role === 'travlr') {
            window.location.href = 'http://localhost:3000'; // Redirect to travlr site
          } else {
            this.router.navigate(['/']); // Redirect admin to root path
          }
        } else {
          console.error('Login successful, but isLoggedIn returned false.');
          this.formError = 'Login successful, but an issue occurred. Please try again.';
        }
      },
      error: (error: any) => {
        console.error('Login error:', error);
        this.formError = 'Invalid email or password. Please try again.';
      }
    });
  }
}