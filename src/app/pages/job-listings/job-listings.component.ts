import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchHeaderComponent } from 'src/app/components/search-header/search-header.component';
import { FilterBarComponent } from 'src/app/components/filter-bar/filter-bar.component';
import { JobListingCardComponent } from 'src/app/components/job-listing-card/job-listing-card.component';

@Component({
  selector: 'app-job-listings',
  standalone: true,
  imports: [CommonModule, SearchHeaderComponent, FilterBarComponent, JobListingCardComponent],
  templateUrl: './job-listings.component.html',
  styleUrl: './job-listings.component.scss'
})
export class JobListingsComponent {

}
