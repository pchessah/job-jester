import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-filter-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-selector.component.html',
  styleUrl: './filter-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSelectorComponent {
  jobsService: JobsService = inject(JobsService);
  @Input({required: true}) options:string[] = [];
  @Input({required: true}) selector: 'Title' | 'Location' | 'Company' | 'Job Type' = 'Job Type';

  onChange(event:any){
    this.jobsService.filterBy(event.target.value, this.selector)
  }

  resetFilter(){
    this.jobsService.filterBy("", this.selector)
  }

}
