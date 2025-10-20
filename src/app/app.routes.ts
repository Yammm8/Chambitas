import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { JobDetailComponent } from './pages/job-detail/job-detail';
import { Profile } from './pages/profile/profile';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProfileLocked } from './pages/profile-locked/profile-locked';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/registro/registro';
import { JobsListComponent } from './pages/jobs-list/jobs-list';
import { AdministracionContratosComponent } from './pages/administracion-contratos/administracion-contratos.component';
import { PublicarTrabajoComponent } from './pages/publicar-trabajo/publicar-trabajo.component';
import { SolicitudTrabajoComponent } from './pages/solicitud-trabajo/solicitud-trabajo.component';
import { VerPerfilComponent } from './pages/ver-perfil/ver-perfil';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'profile',
    component: Profile,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { hideNavbar: true },
  },
  {
    path: 'Registro',
    component: RegisterComponent,
    data: { hideNavbar: true },
  },
  {
    path: 'Lista',
    component: JobsListComponent,
  },
  {
  path: 'job-detail/:id',
    component: JobDetailComponent,
  },
  { path: 'administracion-contratos', component: AdministracionContratosComponent },
  { path: 'publicar-trabajo', component: PublicarTrabajoComponent },
  { path: 'solicitud-trabajo', component: SolicitudTrabajoComponent },
  {
    path:"verPerfil/:userId",
    component: VerPerfilComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
