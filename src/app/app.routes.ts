import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { JobDetailComponent } from './pages/job-detail/job-detail';
import { Profile } from './pages/profile/profile';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProfileLocked } from './pages/profile-locked/profile-locked';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/registro/registro';

export const routes: Routes = [
    {
        path: 'home',
        component: Home
    },
    {
        path: 'profile',
        component: Profile
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path:'job-detail',
        component: JobDetailComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'Registro',
        component: RegisterComponent
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
