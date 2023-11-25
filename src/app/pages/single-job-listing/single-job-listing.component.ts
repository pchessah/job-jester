import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from 'src/app/interfaces/job.interface';

@Component({
  selector: 'app-single-job-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-job-listing.component.html',
  styleUrl: './single-job-listing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleJobListingComponent {

  @Input({required:true}) job!:Job

}
