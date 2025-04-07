import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-remove-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './remove-trip.component.html',
  styleUrl: './remove-trip.component.css',
})
export class RemoveTripComponent implements OnInit {
  public removeForm!: FormGroup;
  submitted = false;
  isAdmin: boolean = false;
  tripId: string | null = null; // Add tripId property

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService,
    private auth: AuthenticationService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit() {
    this.removeForm = this.formBuilder.group({
      _id: ['', Validators.required],
    });

    this.isAdmin = this.auth.getCurrentUser().role === 'admin';

    // Get tripId from query parameters
    this.route.queryParams.subscribe((params) => {
      this.tripId = params['id'];
      if (this.tripId) {
        this.removeForm.patchValue({ _id: this.tripId });
      }
    });
  }

  public onSubmit() {
    this.submitted = true;
    if (this.removeForm.valid) {
      if (this.tripId) {
        console.log('Deleting trip with ID:', this.tripId); // Add this line
        this.tripService.deleteTrip(this.tripId).subscribe({
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
  }

  get f() {
    return this.removeForm.controls;
  }
}