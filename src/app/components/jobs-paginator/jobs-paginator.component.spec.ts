import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsPaginatorComponent } from './jobs-paginator.component';

describe('JobsPaginatorComponent', () => {
  let component: JobsPaginatorComponent;
  let fixture: ComponentFixture<JobsPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsPaginatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobsPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
