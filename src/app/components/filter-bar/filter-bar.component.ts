import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSelectorComponent } from '../filter-selector/filter-selector.component';
import { JobsService } from 'src/app/services/jobs.service';
import { SorterComponent } from '../sorter/sorter.component';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FilterSelectorComponent, SorterComponent],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent {

  jobService: JobsService =  inject(JobsService);

}
