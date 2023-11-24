import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSelectorComponent } from './filter-selector.component';

describe('FilterSelectorComponent', () => {
  let component: FilterSelectorComponent;
  let fixture: ComponentFixture<FilterSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
