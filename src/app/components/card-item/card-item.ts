import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface CardItem {
  id?: number; // opcional, útil si luego quieres identificarlo
  titulo: string;
  nombre?: string; // para solicitudes
  trabajador?: string; // para contratos
  ubicacion?: string; // para solicitudes
  categoria?: string;
  pago?: number;
  fecha?: string; // fecha de solicitud
  fechaInicio?: string; // contratos
  fechaFin?: string; // contratos
  estado: "pendiente" | "aceptada" | "rechazada";
  tipo: 'solicitud' | 'contrato';
}

// components/card-item/card-item.component.ts
@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-item.html',
  styleUrls: ['./card-item.css'],
})
export class CardItemComponent {
  @Input() item!: CardItem;
  @Output() estadoGuardado = new EventEmitter<{ id: number; estado: "pendiente" | "aceptada" | "rechazada"; fecha?: string }>();

  get opcionesEstado(): string[] {
    return this.item.tipo === 'solicitud'
      ? ['Pendiente', 'Aceptada', 'Rechazada']
      : ['Activo', 'Completado', 'Cancelado'];
  }

  claseBoton(): string {
    const e = this.item.estado.toLowerCase();
    if (e === 'pendiente') return 'btn-warning';
    if (e === 'aceptada' || e === 'completado') return 'btn-success';
    if (e === 'rechazada' || e === 'cancelado') return 'btn-danger';
    if (e === 'activo') return 'btn-primary';
    return 'btn-secondary';
  }

 guardarCambios() {
  if (!this.item.id) return;
  if (this.bloqueado()) return; // ⛔ no permitir emitir cambios finales

  this.estadoGuardado.emit({
    id: this.item.id,
    estado: this.item.estado,
    fecha: this.item.estado === 'aceptada' ? this.item.fechaInicio : undefined
  });
}

bloqueado(): boolean {
  return this.item.estado === 'aceptada' || this.item.estado === 'rechazada';
}


}


