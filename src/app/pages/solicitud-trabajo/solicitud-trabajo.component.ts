import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

interface Solicitud {
  titulo: string;
  nombre: string;
  ubicacion: string;
  categoria: string;
  pago: number;
  fecha: string;
  estado: 'Pendiente' | 'Aceptada' | 'Rechazada';
}

@Component({
  selector: 'app-solicitud-trabajo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './solicitud-trabajo.component.html',
  styleUrls: ['./solicitud-trabajo.component.css']
})
export class SolicitudTrabajoComponent {
  // 🔹 Datos base (simulación)
  solicitudes: Solicitud[] = [
    {
      titulo: 'Limpieza de Casa Completa',
      nombre: 'María González',
      ubicacion: 'Centro',
      categoria: 'Limpieza',
      pago: 50000,
      fecha: '11/1/2024',
      estado: 'Pendiente'
    },
    {
      titulo: 'Cuidado de Perro - Fin de Semana',
      nombre: 'Carlos López',
      ubicacion: 'Sur',
      categoria: 'Mascotas',
      pago: 40000,
      fecha: '9/1/2024',
      estado: 'Aceptada'
    },
    {
      titulo: 'Jardinería y Poda de Árboles',
      nombre: 'Ana Martínez',
      ubicacion: 'Centro',
      categoria: 'Limpieza',
      pago: 20000,
      fecha: '6/1/2024',
      estado: 'Rechazada'
    }
  ];

  // 🔹 Filtros y datos derivados
  filtros: ('Todas' | 'Pendiente' | 'Aceptada' | 'Rechazada')[] = [
    'Todas',
    'Pendiente',
    'Aceptada',
    'Rechazada'
  ];

  filtroActual: 'Todas' | 'Pendiente' | 'Aceptada' | 'Rechazada' = 'Todas';

  // 🔹 Variables para las tarjetas de resumen
  totalSolicitudes: number = 0;
  pendientes: number = 0;
  aceptadas: number = 0;
  rechazadas: number = 0;

  // 🔹 Solicitudes filtradas
  solicitudesFiltradas: Solicitud[] = [];

  constructor() {
    this.actualizarDatos();
  }

  cambiarFiltro(filtro: 'Todas' | 'Pendiente' | 'Aceptada' | 'Rechazada') {
    this.filtroActual = filtro;
    this.actualizarDatos();
  }

  // 🔹 Método que actualiza los contadores y la lista visible
  actualizarDatos() {
    this.totalSolicitudes = this.solicitudes.length;
    this.pendientes = this.solicitudes.filter(s => s.estado === 'Pendiente').length;
    this.aceptadas = this.solicitudes.filter(s => s.estado === 'Aceptada').length;
    this.rechazadas = this.solicitudes.filter(s => s.estado === 'Rechazada').length;

    if (this.filtroActual === 'Todas') {
      this.solicitudesFiltradas = this.solicitudes;
    } else {
      this.solicitudesFiltradas = this.solicitudes.filter(
        s => s.estado === this.filtroActual
      );
    }
  }
}
