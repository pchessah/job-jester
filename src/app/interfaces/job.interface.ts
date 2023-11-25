export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  datePosted: string;
  jobType: 'full-time' | 'part-time' | 'remote';
}
