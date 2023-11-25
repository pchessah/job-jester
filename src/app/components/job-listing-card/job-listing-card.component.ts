import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from 'src/app/interfaces/job.interface';

@Component({
  selector: 'app-job-listing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-listing-card.component.html',
  styleUrl: './job-listing-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobListingCardComponent {
  @Input({required:true}) job!:Job

}

