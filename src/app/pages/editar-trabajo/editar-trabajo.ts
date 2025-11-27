import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CardItem, CardItemComponent } from '../../components/card-item/card-item';
import { PostService, Post } from '../../services/post.service';
import {
  ApplicationService,
  Application,
} from '../../services/application.service';
import { finalize } from 'rxjs';

interface Category {
  id: number;
  name: string;
}

type EstadoSolicitudUI = 'pendiente' | 'aceptada' | 'rechazada';

/** helper local (evita dependencia externa) */
function mapEstadoToUI(status: string | undefined | null): EstadoSolicitudUI {
  switch ((status ?? '').toString().toLowerCase()) {
    case 'aceptada':
    case 'accepted':
      return 'aceptada';
    case 'rechazada':
    case 'rejected':
      return 'rechazada';
    default:
      return 'pendiente';
  }
}

@Component({
  selector: 'app-editar-trabajo',
  standalone: true,
  imports: [CommonModule, FormsModule, CardItemComponent],
  templateUrl: './editar-trabajo.html',
  styleUrls: ['./editar-trabajo.css'],
})
export class EditarTrabajoComponent implements OnInit {
  tab: 'editar' | 'solicitudes' = 'editar';

  post: Post = {
    id: 0,
    title: '',
    body: '',
    status: true,
    user_id: 0,
    pay: 0,
    deadline: '',
    location: '',
    category_id: 0,
    createdAt: '',
    updatedAt: '',
  };

  loading = false;
  saving = false; // unificamos
  error: string | null = null;
  success: string | null = null;

  // categorias (las dejé dentro del mismo archivo para no crear nuevos archivos)
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
  selectedCategory = this.categories[0]?.id ?? 1;

solicitudes: CardItem[] = [];

  mostrandoModalFecha = false;
  appAceptadaId: number | null = null;
  fechaInicioSeleccionada = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private postService: PostService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('postId'));
    if (!id) {
      this.error = 'No se encontró el trabajo a editar.';
      return;
    }
    this.cargarPost(id);
  }

  private cargarPost(id: number): void {
    this.loading = true;
    this.error = null;
    this.success = null;

    this.postService.getPostById(id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.post = { ...data, deadline: data.deadline?.split('T')[0] ?? '' };
          // seleccionar categoría si viene en el post
          if ((data as any).category_id) {
            this.selectedCategory = (data as any).category_id;
          }
          // cargar solicitudes relacionadas
          if (data.id) {
            this.cargarSolicitudes(data.id);
          }
        },
        error: (err) => {
          console.error(err);
          this.error = 'No se pudo cargar la información del trabajo';
        },
      });
  }

  cargarSolicitudes(postId: number) {
  this.applicationService.getApplicationsByPost(postId).subscribe({
    next: (data: Application[]) => {
      this.solicitudes = data.map((s) => {
        const u: any = (s as any).user ?? (s as any).User ?? null;
        const estadoUI = mapEstadoToUI(s.status);
        console.log(data);

        return {
          id: s.id,
          titulo: 'Solicitud a la publicación', // ✅ FALTABA
          tipo: 'solicitud',                   // ✅ FALTABA
          nombre: `${u?.name ?? 'Trabajador'} ${u?.last_name ?? ''}`.trim(),
          ubicacion: u?.address ?? 'Sin ubicación',
          categoria: (s as any).Post?.category_id ? `Categoría ${(s as any).Post.category_id}` : undefined,
          pago: (s as any).Post?.pay ?? undefined,
          fecha: s.createdAt?.split('T')[0] ?? '',
          estado: estadoUI                      // ✅ ya coincide con la union
        };
      });
    },
    error: (err) =>{
    this.error = 'No se pudo cargar solicitudes';
    console.error(err)
    }
      

  });
}


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

    this.postService
    .updatePost(this.post.id, payload)
    .pipe(finalize(() => (this.saving = false)))
    .subscribe({
      next: (updated) => {
        this.success = 'Cambios guardados correctamente.';
        this.post = { ...this.post, ...updated };
      },
      error: (err) => {
        console.error('Error: ', err);

        const backendMessage =
          err?.error?.message || err?.error?.error || err?.error;

        this.error = backendMessage
          ? backendMessage
          : 'No se pudieron guardar los cambios.';
      },
    });
  }

  // Recibe evento desde <app-card-item>
recibirCambioEstado(evt: { id: number; estado: EstadoSolicitudUI; fecha?: string }): void {
  if (!evt?.id) return;

  const idx = this.solicitudes.findIndex(s => s.id === evt.id);
  if (idx !== -1) {

    // ⛔ No permitir si ya está aceptada o rechazada
    if (this.solicitudes[idx].estado === 'aceptada' || this.solicitudes[idx].estado === 'rechazada') {
      return;
    }

    this.solicitudes[idx].estado = evt.estado;

    if (evt.fecha && evt.estado === 'aceptada') {
      this.solicitudes[idx].fechaInicio = evt.fecha;
    }

    this.updateEstadoEnBackend({ id: evt.id, estado: evt.estado, fecha: evt.fecha });
  }
}






  confirmarFechaInicio() {
  if (!this.appAceptadaId || !this.fechaInicioSeleccionada) return;

  const id = this.appAceptadaId;
  const fecha = this.fechaInicioSeleccionada;

  this.mostrandoModalFecha = false;
  this.appAceptadaId = null;
  this.fechaInicioSeleccionada = '';

  // Llamada final con formato correcto
  this.updateEstadoEnBackend({ id, estado: 'aceptada', fecha });
}


  cancelarModalFecha() {
    this.mostrandoModalFecha = false;
    this.appAceptadaId = null;
    this.fechaInicioSeleccionada = '';
  }

  private updateEstadoEnBackend(evt: { id: number; estado: EstadoSolicitudUI; fecha?: string }) {
  const payload: any = {
    status: evt.estado // "aceptada" o "rechazada" o "pendiente"
  };

  if (evt.estado === 'aceptada' && evt.fecha) {
    payload.start_date = evt.fecha; // 👈 el backend lo espera así
  }

  this.applicationService.updateApplicationStatus(evt.id, payload.status, payload.start_date)
  .pipe(finalize(() => this.saving = false))
  .subscribe({
    next: () => {
      this.success = 'Estado actualizado correctamente';
      const idx = this.solicitudes.findIndex(s => s.id === evt.id);
      if (idx !== -1 && evt.estado === 'aceptada') {
        this.solicitudes[idx].estado = 'aceptada';
      }
    },
    error: () => this.error = 'No se pudo actualizar la solicitud'
  });
}



  goBack(): void {
    this.location.back();
  }

  private obtenerHoyISO(): string {
    return new Date().toISOString().split('T')[0];
  }

  // helper para el card-item
  getItemSolicitud(s: any) {
    return {
      id: s.id,
      titulo: 'Solicitud a la publicación',
      nombre: s.nombre,
      ubicacion: s.ubicacion,
      categoria: s.categoria,
      pago: s.pago,
      fecha: s.fecha,
      estado: s.estado,
      tipo: 'solicitud' as const,
    };
  }
}
