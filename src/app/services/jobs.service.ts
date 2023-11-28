import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { DataStore } from '../data/data.store';
import { Job } from '../interfaces/job.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })

/**
 * @Class JobService Service that manages the state of the jobs being displayed
 */
export class JobsService {

  //Mock store for jobs
  private readonly _dataStore: DataStore = inject(DataStore);

  //Signal for the list of jobs being displayed at any particular time
  jobsToBeDisplayed!: WritableSignal<Job[]>;

  //Signal for the list of jobs based on conditions specified such as filtering, searching and pagination
  currentAllJobs!: WritableSignal<Job[]>;

  defaultFilter: Job = {
    title: "",
    description: "",
    location: "",
    jobType: "all",
    datePosted: "",
    id: "" as any,
    company: ""
  }

  //Signal to track current filter applied to the view
  currentFilter: WritableSignal<Job> = signal(this.defaultFilter);

  //Signal to track current page being viewed
  currentPage: WritableSignal<number> = signal(1);

  //Tracks number of jobs per page
  jobsPerPage: WritableSignal<number> = signal(5);

  //Used to keep record of all jobs loaded from the data store
  allJobs: Job[] = [];

  //Used to track all the titles that can be filtered
  jobTitles: Signal<string[]> = computed(() => {
    return this.currentAllJobs().length ? this._makeArrayUnique(this.currentAllJobs().map(j => j.title))
      : []
  })
  //Used to track all the company names that can be filtered
  companyNames: Signal<string[]> = computed(() => {
    return this.currentAllJobs().length ? this._makeArrayUnique(this.currentAllJobs().map(j => j.company))
      : []
  })
  //Used to track all the jobtypes that can be filtered
  jobTypes: Signal<string[]> = computed(() => {
    return this.currentAllJobs().length ? this._makeArrayUnique(this.currentAllJobs().map(j => j.jobType))
      : []
  })
  //Used to track all the locations that can be filtered
  jobLocations: Signal<string[]> = computed(() => {
    return this.currentAllJobs().length ? this._makeArrayUnique(this.currentAllJobs().map(j => j.location))
      : []
  })

  //Number of pages array based on total currentjobs count
  totalPages:Signal<number[]> = computed(() => {
    return this._generateArrayOfPages(Math.ceil(this.currentAllJobs().length / this.jobsPerPage()))
  })

  //Helper function
  private _generateArrayOfPages(n:number) {
    return Array.from({ length: n }, (_, index) => index + 1);
}

  constructor() {
    this.setJobsDisplayed()
  }


  //Loads the current view based on the current page
  loadData(newJobs: Job[]): void {
    const startIndex = (this.currentPage() - 1) * this.jobsPerPage()
    const endIndex = startIndex + this.jobsPerPage()
    this.jobsToBeDisplayed.set(newJobs.slice(startIndex, endIndex))
  }

  goToPage(pageNumber: number) {
    this.currentPage.set(pageNumber);
    const startIndex = (this.currentPage() - 1) * this.jobsPerPage()
    const endIndex = startIndex + this.jobsPerPage()
    this.jobsToBeDisplayed.set(this.currentAllJobs().slice(startIndex, endIndex))
  }

  goToPreviousPage(){
    const currentPage = this.currentPage()
    const previousPage = currentPage - 1;
    if(previousPage > 0){
      this.goToPage(previousPage)
      return
    }
  }

  goToNextPage(){
    const currentPage = this.currentPage()
    const totalPages = this.totalPages()[this.totalPages().length -1]
    const nextPage = currentPage + 1;
    if(nextPage <= totalPages){
      this.goToPage(nextPage)
      return
    }
  }

  private _makeArrayUnique<T>(array: T[]) {
    return [...new Set(array)]
  }

  async setJobsDisplayed() {
    const initialVals = await lastValueFrom(this._dataStore.data$)
    this.jobsToBeDisplayed = signal(initialVals);
    this.currentAllJobs = signal(initialVals)
    this.allJobs = this.currentAllJobs()
    this.loadData(this.currentAllJobs());
  }

  reset() {
    this.loadData(this.allJobs)
  }

  sort(direction: 'asc' | 'desc', field: 'Date Posted' | 'Job Type') {
    const jobsSorted =  this.currentAllJobs().slice().sort((a, b) => {
      const aValue = field === 'Job Type' ? a.jobType : a.datePosted;
      const bValue = field === 'Job Type' ? b.jobType : b.datePosted;
  
      // Convert datePosted to a comparable format for sorting
      const dateA = field === 'Date Posted' ? new Date(aValue).getTime() : 0;
      const dateB = field === 'Date Posted' ? new Date(bValue).getTime() : 0;
  
      // Compare values based on the sorting direction
      if (direction === 'asc') {
        return dateA ? dateA - dateB  : aValue.localeCompare(bValue);
      } else {
        return dateB ? dateB - dateA : bValue.localeCompare(aValue);
      }
    });

    this.loadData(jobsSorted)
  }

  doSearch(filterString: string) {
    this.currentPage.set(1)

    if (!filterString.length) {
      this.reset()
      return;
    }

    const currentJobsDisplayed = this.currentAllJobs()

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

     this.currentAllJobs.set(filteredJobs)
     this.loadData(filteredJobs)
  }

  filterBy(keyword: string, filter: 'Title' | 'Location' | 'Company' | 'Job Type') {
    this.currentPage.set(1)

    let currentJobs =  this.currentAllJobs()
    if (filter === 'Title') {
      this.currentFilter.set({ ...this.currentFilter(), title: keyword });
       this.currentAllJobs.set(currentJobs.filter(j => j.title.includes(keyword)))
    } else if (filter === 'Location') {
      this.currentFilter.set({ ...this.currentFilter(), location: keyword });
        this.currentAllJobs.set(currentJobs.filter(j => j.location.includes(keyword)))
    } else if (filter === 'Company') {
      this.currentFilter.set({ ...this.currentFilter(), company: keyword });
        this.currentAllJobs.set(currentJobs.filter(j => j.company.includes(keyword)))
    } else if (filter === 'Job Type') {
      this.currentFilter.set({ ...this.currentFilter(), jobType: keyword as any });
        this.currentAllJobs.set(currentJobs.filter(j => j.jobType.includes(keyword)))
    } else {
      this.currentFilter.set(this.defaultFilter)
    }

    this.loadData(this.currentAllJobs())
  }

  resetFilterType(filter: 'Title' | 'Location' | 'Company' | 'Job Type') {
    this.currentPage.set(1)
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

    this.currentAllJobs.set(currentItems)

    this.loadData(currentItems);

  }


}


