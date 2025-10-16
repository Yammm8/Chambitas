import { Routes } from '@angular/router';
import { JobsListComponent } from './pages/jobs-list/jobs-list';
import { JobDetailComponent } from './pages/job-detail/job-detail';

export const routes: Routes = [
  { path: '', component: JobsListComponent },
  { path: 'jobs/:id', component: JobDetailComponent },
  { path: '**', redirectTo: '' }
];
