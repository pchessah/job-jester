import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'job-listing',
    loadComponent: () => import('./pages/job-listings/job-listings.component').then((m) => m.JobListingsComponent),
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing/landing.component').then((m) => m.LandingComponent),
  },
  { path: '',   redirectTo: '/landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
