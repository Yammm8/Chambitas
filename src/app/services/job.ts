import { Injectable } from '@angular/core';

export interface JobDetail {
  id: number;
  titulo: string;
  categoria: string;
  ubicacion: string;
  descripcion: string;
  pago: number;
  fechaPublicacion: string;
  fechaLimite: string;
  empleador: string;
  miembroDesde: string;
}

@Injectable({
  providedIn: 'root'
})

export class Job {
  private trabajos: JobDetail[] = [
    {
      id: 1,
      titulo: 'Diseñador Gráfico Freelance',
      categoria: 'Diseño',
      ubicacion: 'Remoto',
      descripcion: 'Buscamos diseñador con experiencia en branding y redes sociales.',
      pago: 5000,
      fechaPublicacion: '2025-10-01',
      fechaLimite: '2025-10-20',
      empleador: 'Agencia Creativa XYZ',
      miembroDesde: '2022'
    },
    {
      id: 2,
      titulo: 'Repartidor de Comida - Zona Norte',
      categoria: 'Delivery',
      ubicacion: 'Norte, Ciudad',
      descripcion: 'Buscamos repartidores con moto propia. Pago por entrega más propinas.',
      pago: 3000,
      fechaPublicacion: '2025-10-05',
      fechaLimite: '2025-10-25',
      empleador: 'Comidas Rápidas ABC',
      miembroDesde: '2021'
    },
    {
      id: 3,
      titulo: 'Asistente Virtual para E-commerce',
      categoria: 'Administrativo', 
      ubicacion: 'Remoto',
      descripcion: 'Se necesita asistente virtual para manejo de pedidos y atención al cliente.',
      pago: 4000,
      fechaPublicacion: '2025-10-10',
      fechaLimite: '2025-10-30',
      empleador: 'Tienda Online 123',
      miembroDesde: '2023'
    },
    {
      id: 3,
      titulo: 'Asistente Virtual para E-commerce',
      categoria: 'Administrativo', 
      ubicacion: 'Remoto',
      descripcion: 'Se necesita asistente virtual para manejo de pedidos y atención al cliente.',
      pago: 4000,
      fechaPublicacion: '2025-10-10',
      fechaLimite: '2025-10-30',
      empleador: 'Tienda Online 123',
      miembroDesde: '2023'
    },
    {
      id: 3,
      titulo: 'Asistente Virtual para E-commerce',
      categoria: 'Administrativo', 
      ubicacion: 'Remoto',
      descripcion: 'Se necesita asistente virtual para manejo de pedidos y atención al cliente.',
      pago: 4000,
      fechaPublicacion: '2025-10-10',
      fechaLimite: '2025-10-30',
      empleador: 'Tienda Online 123',
      miembroDesde: '2023'
    },
    {
      id: 3,
      titulo: 'Asistente Virtual para E-commerce',
      categoria: 'Administrativo', 
      ubicacion: 'Remoto',
      descripcion: 'Se necesita asistente virtual para manejo de pedidos y atención al cliente.',
      pago: 4000,
      fechaPublicacion: '2025-10-10',
      fechaLimite: '2025-10-30',
      empleador: 'Tienda Online 123',
      miembroDesde: '2023'
    }
  ];
  getTrabajos(): JobDetail[] {
    return this.trabajos;
  }
  getTrabajoPorId(id: number): JobDetail | undefined {
    return this.trabajos.find(trabajo => trabajo.id === id);
  }
}
