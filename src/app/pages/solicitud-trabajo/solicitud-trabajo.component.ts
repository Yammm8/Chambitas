import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import {
  ApplicationService,
  Application,
} from '../../services/application.service';
import { PostService, Post } from '../../services/post.service';

type EstadoUI = 'Pendiente' | 'Aceptada' | 'Rechazada';
type FiltroUI = 'Todas' | EstadoUI;

interface SolicitudUI {
  postId: number;
  titulo: string;
  nombre: string;
  ubicacion: string;
  categoria: string;
  pago: number;
  fecha: string;
  estado: EstadoUI;
}

@Component({
  selector: 'app-solicitud-trabajo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './solicitud-trabajo.component.html',
  styleUrls: ['./solicitud-trabajo.component.css'],
})
export class SolicitudTrabajoComponent implements OnInit {
  // 🔹 Datos que vienen del backend ya mapeados a la UI
  solicitudes: SolicitudUI[] = [];
  solicitudesFiltradas: SolicitudUI[] = [];

  // 🔹 Filtros y stats
  filtros: FiltroUI[] = ['Todas', 'Pendiente', 'Aceptada', 'Rechazada'];
  filtroActual: FiltroUI = 'Todas';

  totalSolicitudes = 0;
  pendientes = 0;
  aceptadas = 0;
  rechazadas = 0;

  // 🔹 estado de carga
  loading = false;
  error = '';

  constructor(
    private applicationService: ApplicationService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  private cargarSolicitudes(): void {
    this.loading = true;
    this.error = '';

    this.applicationService.getMyApplications().subscribe({
      next: (apps: Application[]) => {
        // Si no hay aplicaciones, sólo actualizamos estados y salimos
        if (!apps || apps.length === 0) {
          this.solicitudes = [];
          this.actualizarDatos();
          this.loading = false;
          return;
        }

        // Pedimos los posts correspondientes a cada application.post_id
        const peticionesPosts = apps.map((a) =>
          this.postService.getPostById(a.post_id)
        );

        forkJoin(peticionesPosts).subscribe({
          next: (posts: Post[]) => {
            this.solicitudes = apps.map((a, i) =>
              this.mapApplicationToSolicitud(a, posts[i])
            );
            this.actualizarDatos();
            this.loading = false;
          },
          error: (err) => {
            console.error('Error cargando posts de aplicaciones:', err);
            this.error =
              'No se pudieron cargar los detalles de las publicaciones.';
            this.loading = false;
          },
        });
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar tus aplicaciones.';
        this.loading = false;
      },
    });
  }

  /**
   * Convierte una Application + su Post en el modelo que usamos en la tarjeta.
   */
  private mapApplicationToSolicitud(
    a: Application,
    post?: Post
  ): SolicitudUI {
    // Título
    const titulo = post?.title ?? `Publicación #${a.post_id}`;

    // Nombre del empleador (si el backend lo manda, si no, fallback)
    const nombreEmpleador = a.user
      ? `${a.user.name} ${a.user.last_name}`
      : 'Empleador';

    // Ubicación y categoría
    const ubicacion = post?.location || a.user?.address || 'Sin ubicación';

    const categoria = post
      ? `Categoría #${post.category_id}`
      : 'Sin categoría';

    // Pago
    const pago = post?.pay ?? 0;

    // Fecha: primero la de la aplicación, si no, la del post
    const fechaBase = a.createdAt || post?.createdAt || '';
    const fecha = fechaBase ? fechaBase.split('T')[0] : '';

    return {
      postId: post?.id ?? a.post_id,
      titulo,
      nombre: nombreEmpleador,
      ubicacion,
      categoria,
      pago,
      fecha,
      estado: this.mapEstadoBackend(a.status),
    };
  }

  private mapEstadoBackend(status: string): EstadoUI {
    const s = (status || '').toLowerCase();

    if (s === 'accepted' || s === 'aceptada') return 'Aceptada';
    if (s === 'rejected' || s === 'rechazada') return 'Rechazada';

    // cualquier otro valor lo tratamos como pendiente
    return 'Pendiente';
  }

  cambiarFiltro(filtro: FiltroUI): void {
    this.filtroActual = filtro;
    this.actualizarDatos();
  }

  // 🔹 Recalcula contadores y la lista visible
  private actualizarDatos(): void {
    this.totalSolicitudes = this.solicitudes.length;
    this.pendientes = this.solicitudes.filter(
      (s) => s.estado === 'Pendiente'
    ).length;
    this.aceptadas = this.solicitudes.filter(
      (s) => s.estado === 'Aceptada'
    ).length;
    this.rechazadas = this.solicitudes.filter(
      (s) => s.estado === 'Rechazada'
    ).length;

    if (this.filtroActual === 'Todas') {
      this.solicitudesFiltradas = this.solicitudes;
    } else {
      this.solicitudesFiltradas = this.solicitudes.filter(
        (s) => s.estado === this.filtroActual
      );
    }
  }
}
