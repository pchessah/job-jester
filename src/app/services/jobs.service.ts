import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { DataStore } from '../data/data.store';
import { Job } from '../interfaces/job.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobsService {

  private readonly _dataStore: DataStore = inject(DataStore);

  jobsToBeDisplayed!: WritableSignal<Job[]>;
  defaultFilter: Job = {
    title: "",
    description: "",
    location: "",
    jobType: "all",
    datePosted: "",
    id: "" as any,
    company: ""
  }
  currentFilter: WritableSignal<Job> = signal(this.defaultFilter);

  allJobs: Job[] = [];


  jobTitles: Signal<string[]> = computed(() => {
    return this.jobsToBeDisplayed().length ? this._makeArrayUnique(this.jobsToBeDisplayed().map(j => j.title))
      : []
  })

  companyNames: Signal<string[]> = computed(() => {
    return this.jobsToBeDisplayed().length ? this._makeArrayUnique(this.jobsToBeDisplayed().map(j => j.company))
      : []
  })

  jobTypes: Signal<string[]> = computed(() => {

    return this.jobsToBeDisplayed().length ? this._makeArrayUnique(this.jobsToBeDisplayed().map(j => j.jobType))
      : []
  })

  jobLocations: Signal<string[]> = computed(() => {
    return this.jobsToBeDisplayed().length ? this._makeArrayUnique(this.jobsToBeDisplayed().map(j => j.location))
      : []
  })

  constructor() {
    this.setJobsDisplayed()
  }


  private _makeArrayUnique<T>(array: T[]) {
    return [...new Set(array)]
  }


  async setJobsDisplayed() {
    this.jobsToBeDisplayed = signal(await lastValueFrom(this._dataStore.data$))
    this.allJobs = this.jobsToBeDisplayed()
  }

  reset() {
    this.jobsToBeDisplayed.set(this.allJobs)
  }

  doSearch(filterString: string) {

    if (!filterString.length) {
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

  filterBy(keyword: string, filter: 'Title' | 'Location' | 'Company' | 'Job Type') {

    if (filter === 'Title') {
      this.currentFilter.set({ ...this.currentFilter(), title: keyword });
      this.jobsToBeDisplayed.set(this.jobsToBeDisplayed().filter(j => j.title.includes(keyword)))
    } else if (filter === 'Location') {
      this.currentFilter.set({ ...this.currentFilter(), location: keyword });
      this.jobsToBeDisplayed.set(this.jobsToBeDisplayed().filter(j => j.location.includes(keyword)))
    } else if (filter === 'Company') {
      this.currentFilter.set({ ...this.currentFilter(), company: keyword });
      this.jobsToBeDisplayed.set(this.jobsToBeDisplayed().filter(j => j.company.includes(keyword)))
    } else if (filter === 'Job Type') {
      this.currentFilter.set({ ...this.currentFilter(), jobType: keyword as any });
      this.jobsToBeDisplayed.set(this.jobsToBeDisplayed().filter(j => j.jobType.includes(keyword)))
    } else {
      this.currentFilter.set(this.defaultFilter)
    }
  }

  resetFilterType(filter: 'Title' | 'Location' | 'Company' | 'Job Type') {
    
    if (filter === 'Title') {
      this.currentFilter.set({ ...this.currentFilter(), title: "" });
    } else if (filter === 'Location') {
      this.currentFilter.set({ ...this.currentFilter(), location: "" });
    } else if (filter === 'Company') {
      this.currentFilter.set({ ...this.currentFilter(), company: "" });
    } else if (filter === 'Job Type') {
      this.currentFilter.set({ ...this.currentFilter(), jobType: "all" });
    }

    let currentItems = this.allJobs

    if (this.currentFilter().title.length) {
      currentItems = currentItems.filter(i => i.title === this.currentFilter().title)
    }

    if (this.currentFilter().location.length) {
      currentItems = currentItems.filter(i => i.location === this.currentFilter().location)
    }

    if (this.currentFilter().company.length) {
      currentItems = currentItems.filter(i => i.company === this.currentFilter().company)
    }

    if (this.currentFilter().jobType === 'all') {
      currentItems = currentItems.filter(i => (i.jobType === 'full-time') || (i.jobType === 'part-time') || (i.jobType === 'remote'))

    }

    this.jobsToBeDisplayed.set(currentItems);

  }


}


