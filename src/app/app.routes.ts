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
import { EditarTrabajoComponent } from './pages/editar-trabajo/editar-trabajo';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
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
  {
    path: 'editarTrabajo/:postId',
    component: EditarTrabajoComponent,
    canActivate: [AuthGuard],
  },
  { path: 'administracion-contratos', component: AdministracionContratosComponent, canActivate: [AuthGuard], },
  { path: 'publicar-trabajo', component: PublicarTrabajoComponent, canActivate: [AuthGuard], },
  { path: 'solicitud-trabajo', component: SolicitudTrabajoComponent, canActivate: [AuthGuard], },
  {
    path: 'verPerfil/:userId',
    component: VerPerfilComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
