import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-sorter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sorter.component.html',
  styleUrl: './sorter.component.scss'
})
export class SorterComponent {
  @Input({required: true}) sortField: 'Date Posted' | 'Job Type' = 'Date Posted';
  jobsService: JobsService = inject(JobsService);

}
