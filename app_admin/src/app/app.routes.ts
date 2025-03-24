// app.routes.ts
import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { TravlrGuardService } from './travlr-guard.service';

export const routes: Routes = [
  { path: '', component: TripListingComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  {
    path: 'add-trip',
    component: AddTripComponent,
    canActivate: [AuthGuardService, TravlrGuardService],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'edit-trip',
    component: EditTripComponent,
    canActivate: [AuthGuardService, TravlrGuardService],
    data: { expectedRole: 'admin' },
  },
];