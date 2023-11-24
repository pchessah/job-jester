import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListingCardComponent } from './job-listing-card.component';

describe('JobListingCardComponent', () => {
  let component: JobListingCardComponent;
  let fixture: ComponentFixture<JobListingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobListingCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobListingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
