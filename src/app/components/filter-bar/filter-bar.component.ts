import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSelectorComponent } from '../filter-selector/filter-selector.component';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FilterSelectorComponent],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent {

}
