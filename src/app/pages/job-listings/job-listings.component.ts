import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchHeaderComponent } from 'src/app/components/search-header/search-header.component';
import { FilterBarComponent } from 'src/app/components/filter-bar/filter-bar.component';
import { JobListingCardComponent } from 'src/app/components/job-listing-card/job-listing-card.component';
import { JobsService } from 'src/app/services/jobs.service';
import { JobsPaginatorComponent } from 'src/app/components/jobs-paginator/jobs-paginator.component';

@Component({
  selector: 'app-job-listings',
  standalone: true,
  imports: [CommonModule, SearchHeaderComponent, FilterBarComponent, JobListingCardComponent, JobsPaginatorComponent],
  templateUrl: './job-listings.component.html',
  styleUrl: './job-listings.component.scss'
})
export class JobListingsComponent {

  jobService: JobsService = inject(JobsService);


}
