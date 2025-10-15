import { Routes } from '@angular/router';
import { AdministracionContratosComponent } from './pages/administracion-contratos/administracion-contratos.component';
import { PublicarTrabajoComponent } from './pages/publicar-trabajo/publicar-trabajo.component';
import { SolicitudTrabajoComponent } from './pages/solicitud-trabajo/solicitud-trabajo.component';

export const routes: Routes = [
  { path: 'administracion-contratos', component: AdministracionContratosComponent },
  { path: 'publicar-trabajo', component: PublicarTrabajoComponent },
  { path: 'solicitud-trabajo', component: SolicitudTrabajoComponent },
];
