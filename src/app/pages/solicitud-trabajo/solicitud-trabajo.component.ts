import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ApplicationService, Application } from '../../services/application.service';

@Component({
  selector: 'app-solicitud-trabajo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './solicitud-trabajo.component.html',
  styleUrls: ['./solicitud-trabajo.component.css']
})
export class SolicitudTrabajoComponent {

  solicitudesBackend: Application[] = [];
  solicitudesFiltradas: any[] = [];

  filtros: ('Todas' | 'Pendiente' | 'Aceptada' | 'Rechazada')[] = [
    'Todas',
    'Pendiente',
    'Aceptada',
    'Rechazada'
  ];

  filtroActual: 'Todas' | 'Pendiente' | 'Aceptada' | 'Rechazada' = 'Todas';

  totalSolicitudes = 0;
  pendientes = 0;
  aceptadas = 0;
  rechazadas = 0;

  loading = false;
  error = '';

  constructor(private appService: ApplicationService) {}

  ngOnInit() {
    this.cargarSolicitudes();
  }

  /** 🔹 Trae aplicaciones reales del backend */
  cargarSolicitudes() {
    this.loading = true;
    this.error = '';

    this.appService.getMyApplications().subscribe({
      next: (apps) => {
        this.solicitudesBackend = apps;

        // Mapear al formato visual del HTML
        this.solicitudesFiltradas = apps.map(a => ({
          id: a.id,
          titulo: a.post.title,
          nombre: "Tú aplicaste", // el backend NO trae nombre del empleador
          ubicacion: a.post.location,
          categoria: a.post.category_id,
          pago: a.post.pay,
          fecha: new Date(a.post.createdAt).toLocaleDateString(),
          estado: this.mapEstado(a.status)
        }));

        this.actualizarDatos();
        this.loading = false;
      },
      error: () => {
        this.error = "No se pudieron cargar las solicitudes.";
        this.loading = false;
      }
    });
  }

  /** 🔹 Traducir estados del backend a los visibles */
  mapEstado(status: string): 'Pendiente' | 'Aceptada' | 'Rechazada' {
    switch (status) {
      case 'aceptada': return 'Aceptada';
      case 'rechazada': return 'Rechazada';
      default: return 'Pendiente';
    }
  }

  cambiarFiltro(filtro: 'Todas' | 'Pendiente' | 'Aceptada' | 'Rechazada') {
    this.filtroActual = filtro;
    this.actualizarDatos();
  }

  actualizarDatos() {
    const lista = this.solicitudesFiltradas;

    this.totalSolicitudes = lista.length;
    this.pendientes = lista.filter(s => s.estado === 'Pendiente').length;
    this.aceptadas = lista.filter(s => s.estado === 'Aceptada').length;
    this.rechazadas = lista.filter(s => s.estado === 'Rechazada').length;

    if (this.filtroActual === 'Todas') {
      this.solicitudesFiltradas = lista;
    } else {
      this.solicitudesFiltradas = lista.filter(s => s.estado === this.filtroActual);
    }
  }
}
