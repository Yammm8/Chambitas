import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  constructor() {}

  // Simulación de datos por ahora
  obtenerContratos(): Observable<any[]> {
    const contratos = [
      {
        titulo: 'Limpieza de Casa completa',
        trabajador: 'Juan Pérez',
        categoria: 'Limpieza',
        pago: 50000,
        fechaInicio: '14/1/2024',
        fechaFin: '14/1/2024',
        creado: '12/1/2024',
        estado: 'Completado'
      },
      {
        titulo: 'Cuidado de Perro - Fin de Semana',
        trabajador: 'Carlos López',
        categoria: 'Cuidado',
        pago: 50000,
        fechaInicio: '19/1/2024',
        fechaFin: '20/1/2024',
        creado: '18/1/2024',
        estado: 'Activo'
      },
      {
        titulo: 'Ayudante de Cocina - Evento',
        trabajador: 'Ana García',
        categoria: 'Cocina',
        pago: 50000,
        fechaInicio: '19/1/2024',
        fechaFin: '20/1/2024',
        creado: '12/1/2024',
        estado: 'Activo'
      },
      {
        titulo: 'Limpieza de Oficina',
        trabajador: 'María Torres',
        categoria: 'Limpieza',
        pago: 40000,
        fechaInicio: '11/1/2024',
        fechaFin: '11/1/2024',
        creado: '10/1/2024',
        estado: 'Cancelado'
      }
    ];
    return of(contratos); // 🔹 Esto simula una respuesta de API o BD
  }
}
