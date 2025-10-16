import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.html',
  styleUrls: ['./jobs-list.css']
})
export class JobsListComponent implements OnInit {
  jobs: Job[] = [];
  cargando: boolean = false;
  error: string | null = null;

  q: string = '';
  categoria: string = '';
  ordenar: string = 'recientes';

  constructor(private router: Router) {}

  ngOnInit() {
    // 🔹 Datos simulados (placeholder hasta que el backend esté listo)
    this.jobs = [
      {
        id: 1,
        titulo: 'Limpieza de Casa Completa',
        categoria: 'Limpieza',
        ubicacion: 'Centro, Ciudad',
        descripcion: 'Se necesita limpieza profunda de casa de 3 habitaciones...',
        pago: 25000,
        fecha: new Date().toISOString(),
        empresa: 'Particular'
      },
      {
        id: 2,
        titulo: 'Repartidor de Comida - Zona Norte',
        categoria: 'Delivery',
        ubicacion: 'Norte, Ciudad',
        descripcion: 'Reparto de pedidos con moto propia. Horarios flexibles...',
        pago: 30000,
        fecha: new Date().toISOString(),
        empresa: 'Restaurante El Buen Sabor'
      },
      {
        id: 3,
        titulo: 'Cuidado de Perro - Fin de Semana',
        categoria: 'Cuidado de mascotas',
        ubicacion: 'Sur, Ciudad',
        descripcion: 'Se busca persona responsable para cuidar a un Golden Retriever...',
        pago: 18000,
        fecha: new Date().toISOString(),
        empresa: 'Particular'
      }
    ];
  }

  aplicar() {
    // Aquí podrías agregar lógica de filtrado si quieres
    console.log('Filtros aplicados:', this.q, this.categoria, this.ordenar);
  }

  limpiar() {
    this.q = '';
    this.categoria = '';
    this.ordenar = 'recientes';
  }

  verDetalles(id: number) {
    this.router.navigate(['/jobs', id]);
  }
}
