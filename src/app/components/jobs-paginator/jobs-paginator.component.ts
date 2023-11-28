import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-jobs-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobs-paginator.component.html',
  styleUrl: './jobs-paginator.component.scss'
})
export class JobsPaginatorComponent {

  jobsService: JobsService = inject(JobsService)

}
