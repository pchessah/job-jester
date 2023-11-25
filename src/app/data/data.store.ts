import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { data } from './data';
import { Job } from '../interfaces/job.interface';

@Injectable({providedIn: 'root'})
export class DataStore{
  
  data$:Observable<Job[]> = of(this.convertJSONToObjects(JSON.stringify(data)));

  private convertJSONToObjects(jsonString: string) {
    try {
      const objectArray = JSON.parse(jsonString);
      return objectArray;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  }
}
  
