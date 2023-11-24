import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleJobListingComponent } from './single-job-listing.component';

describe('SingleJobListingComponent', () => {
  let component: SingleJobListingComponent;
  let fixture: ComponentFixture<SingleJobListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleJobListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleJobListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
