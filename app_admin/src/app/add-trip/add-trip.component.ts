import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service'; // Import auth service

@Component({
  selector: 'app-add-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css',
})
export class AddTripComponent implements OnInit {
  public addForm!: FormGroup;
  submitted = false;
  isAdmin: boolean = false; // Add isAdmin property

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService,
    private auth: AuthenticationService // Inject auth service
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.isAdmin = this.auth.getCurrentUser().role === 'admin'; // Get user role
  }

  public onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        },
      });
    }
  }

  get f() {
    return this.addForm.controls;
  }
}