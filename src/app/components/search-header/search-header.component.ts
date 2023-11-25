import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsService } from 'src/app/services/jobs.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-header.component.html',
  styleUrl: './search-header.component.scss'
})
export class SearchHeaderComponent {

  searchString:string = "";
  jobService: JobsService = inject(JobsService);

}
