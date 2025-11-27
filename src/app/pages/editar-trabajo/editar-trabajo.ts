import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CardItem } from '../../components/card-item/card-item';
import { PostService, Post } from '../../services/post.service';
import {
  ApplicationService,
  Application,
} from '../../services/application.service';

interface Category {
  id: number;
  name: string;
}

type EstadoSolicitudUI = 'Pendiente' | 'Aceptada' | 'Rechazada';

@Component({
  selector: 'app-editar-trabajo',
  standalone: true,
  imports: [CommonModule, FormsModule, CardItem],
  templateUrl: './editar-trabajo.html',
  styleUrls: ['./editar-trabajo.css'],
})
export class EditarTrabajoComponent implements OnInit {
  // pestaña actual
  tab: 'editar' | 'solicitudes' = 'editar';

  post: Post = {
    id: 0,
    title: '',
    body: '',
    status: true,
    user_id: 0,
    createdAt: '',
    pay: 0,
    deadline: '',
    location: '',
    category_id: 0,
    updatedAt: '',
  };

  loading = false;
  saving = false;
  error: string | null = null;
  success: string | null = null;

  categories: Category[] = [
    { id: 1, name: 'Limpieza' },
    { id: 2, name: 'Jardinería' },
    { id: 3, name: 'Construcción' },
    { id: 4, name: 'Cuidado de niños' },
    { id: 5, name: 'Cuidado de mascotas' },
    { id: 6, name: 'Cocina' },
    { id: 7, name: 'Reparaciones' },
    { id: 8, name: 'Pintura' },
    { id: 9, name: 'Mudanzas' },
    { id: 10, name: 'Eventos' },
    { id: 11, name: 'Otros' },
  ];
  selectedCategory = this.categories[0].id;

  // 🔹 solicitudes reales
  solicitudes: {
    id: number;
    nombre: string;
    ubicacion: string;
    categoria: string;
    fecha: string;
    estado: EstadoSolicitudUI;
  }[] = [];

  // 🔹 estado para modal de fecha de inicio
  mostrandoModalFecha = false;
  solicitudSeleccionadaId: number | null = null;
  fechaInicioSeleccionada = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private postService: PostService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('postId');
    const id = idParam ? Number(idParam) : null;

    if (id) {
      this.cargarPost(id);
    } else {
      this.error = 'No se encontró el trabajo a editar.';
    }
  }

  private cargarPost(id: number): void {
    this.loading = true;
    this.error = null;
    this.success = null;

    this.postService.getPostById(id).subscribe({
      next: (data) => {
        const deadline = data.deadline ? data.deadline.split('T')[0] : '';

        this.post = {
          ...data,
          deadline,
        };

        this.selectedCategory =
          (data as any).category_id && (data as any).category_id !== 0
            ? (data as any).category_id
            : this.categories[0].id;

        this.loading = false;
        console.log('Post cargado:', this.post);

        // solicitudes ligadas a este post
        if (this.post.id) {
          this.cargarSolicitudesDePost(this.post.id);
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudo cargar la información del trabajo.';
        this.loading = false;
      },
    });
  }

  private mapEstado(status: string): EstadoSolicitudUI {
    switch (status?.toLowerCase()) {
      case 'aceptada':
        return 'Aceptada';
      case 'rechazada':
        return 'Rechazada';
      default:
        return 'Pendiente';
    }
  }

  private cargarSolicitudesDePost(postId: number): void {
    console.log('Cargando solicitudes para postId =', postId);

    this.applicationService.getApplicationsByPost(postId).subscribe({
      next: (apps: Application[]) => {
        console.log('Respuesta getApplicationsByPost:', apps);

        this.solicitudes = apps.map((a) => {
          const user = a.User || (a as any).user;

          const nombre = user
            ? `${user.name ?? ''} ${user.last_name ?? ''}`.trim()
            : 'Trabajador';

          const post: any = (a as any).Post || (a as any).post || {};

          const ubicacion = post.location || user?.address || 'Sin ubicación';

          const categoria = post.category_id
            ? `Categoría ${post.category_id}`
            : 'Sin categoría';

          const fechaBase = (a as any).createdAt || post.createdAt;
          const fecha =
            typeof fechaBase === 'string' ? fechaBase.split('T')[0] : '';

          return {
            id: a.id,
            nombre,
            ubicacion,
            categoria,
            fecha,
            estado: this.mapEstado(a.status),
          };
        });

        console.log('Solicitudes del post mapeadas:', this.solicitudes);
      },
      error: (err) => {
        console.error('Error cargando solicitudes del post:', err);
      },
    });
  }

  goBack(): void {
    this.location.back();
  }

  // 🔹 Guardar cambios en el backend (post)
  onSubmit(): void {
    if (!this.post || !this.post.id) return;

    this.error = null;
    this.success = null;
    this.saving = true;

    const payload = {
      title: this.post.title,
      body: this.post.body,
      pay: this.post.pay,
      deadline: this.post.deadline,
      location: this.post.location,
      status: this.post.status,
      category_id: this.selectedCategory,
    };

    this.postService.updatePost(this.post.id, payload).subscribe({
      next: (updated) => {
        this.saving = false;
        this.success = 'Cambios guardados correctamente.';
        this.post = {
          ...this.post,
          ...updated,
        };
      },
      error: (err) => {
        console.error(err);
        this.saving = false;
        this.error = 'No se pudieron guardar los cambios.';
      },
    });
  }

  // ------------------ manejo de solicitudes ------------------

  // viene desde <app-card-item> (Aceptar / Rechazar)
  onEstadoSolicitud(event: { id?: number; nuevoEstado: string }) {
    console.log('Solicitud actualizada (UI):', event);

    if (!event.id) {
      console.warn('Solicitud sin id, no se puede actualizar en backend');
      return;
    }

    const uiEstado = event.nuevoEstado as EstadoSolicitudUI;

    // Si es Aceptada, abrimos modal para elegir fecha de inicio
    if (uiEstado === 'Aceptada') {
      this.solicitudSeleccionadaId = event.id;
      this.fechaInicioSeleccionada = this.obtenerHoyISO();
      this.mostrandoModalFecha = true;
      return;
    }

    // Pendiente / Rechazada se mandan directo
    this.actualizarSolicitudEnBackend(event.id, uiEstado);
  }

  private actualizarSolicitudEnBackend(
    id: number,
    uiEstado: EstadoSolicitudUI,
    fechaInicio?: string
  ): void {
    let backendStatus = 'pendiente';
    switch (uiEstado) {
      case 'Aceptada':
        backendStatus = 'aceptada';
        break;
      case 'Rechazada':
        backendStatus = 'rechazada';
        break;
      default:
        backendStatus = 'pendiente';
    }

    // actualizamos en el arreglo local
    const idx = this.solicitudes.findIndex((s) => s.id === id);
    if (idx !== -1) {
      this.solicitudes[idx].estado = uiEstado;
    }

    this.applicationService
      .updateApplicationStatus(id, backendStatus, fechaInicio)
      .subscribe({
        next: (msg) => {
          console.log('Solicitud actualizada en backend:', msg);
          this.success = 'Estado de solicitud actualizado.';
        },
        error: (err) => {
          console.error('Error actualizando solicitud en backend:', err);
          this.error = 'No se pudo actualizar la solicitud.';
          if (this.post.id) {
            this.cargarSolicitudesDePost(this.post.id);
          }
        },
      });
  }

  // -------- modal de fecha de inicio --------

  confirmarFechaInicio(): void {
    if (!this.solicitudSeleccionadaId) return;
    if (!this.fechaInicioSeleccionada) return;

    const id = this.solicitudSeleccionadaId;

    this.mostrandoModalFecha = false;
    this.solicitudSeleccionadaId = null;

    this.actualizarSolicitudEnBackend(id, 'Aceptada', this.fechaInicioSeleccionada);
  }

  cancelarModalFecha(): void {
    this.mostrandoModalFecha = false;
    this.solicitudSeleccionadaId = null;
    this.fechaInicioSeleccionada = '';
  }

  private obtenerHoyISO(): string {
    return new Date().toISOString().split('T')[0];
  }

  // helper para el card-item
  getItemSolicitud(s: any) {
    return { ...s, tipo: 'solicitud' };
  }
}
