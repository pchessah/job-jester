import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { DataStore } from '../data/data.store';
import { Job } from '../interfaces/job.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({providedIn: 'root'})
export class JobsService {

  private readonly  _dataStore: DataStore = inject(DataStore);

  jobsToBeDisplayed!: WritableSignal<Job[]>;
  allJobs:Job[] = [];

  constructor(){
    this.setJobsDisplayed()
  }

  updateJobsToBeDisplayed(){
     return this.jobsToBeDisplayed.update((val) => val.filter(res => res.id === 1))
  }

  async setJobsDisplayed() {
    this.jobsToBeDisplayed = signal(await lastValueFrom(this._dataStore.data$))
    this.allJobs = this.jobsToBeDisplayed()
  }

  reset(){
    this.jobsToBeDisplayed.set(this.allJobs)
  }

  doSearch(filterString: string){

    if(!filterString.length){
      this.reset()
      return;
    }

    const currentJobsDisplayed = this.jobsToBeDisplayed()
    const filteredJobs = currentJobsDisplayed.filter((job) => {
      // Convert all the properties to lowercase for case-insensitive matching
      const lowerFilter = filterString.toLowerCase();
      const lowerTitle = job.title.toLowerCase();
      const lowerCompany = job.company.toLowerCase();
      const lowerLocation = job.location.toLowerCase();
      const lowerDescription = job.description.toLowerCase();
      const lowerDatePosted = job.datePosted.toLowerCase();
      const lowerJobType = job.jobType.toLowerCase();
  
      // Check if any of the properties contain the filter string
      return (
        lowerTitle.includes(lowerFilter) ||
        lowerCompany.includes(lowerFilter) ||
        lowerLocation.includes(lowerFilter) ||
        lowerDescription.includes(lowerFilter) ||
        lowerDatePosted.includes(lowerFilter) ||
        lowerJobType.includes(lowerFilter)
      );
    });

    this.jobsToBeDisplayed.set(filteredJobs)

  }


}