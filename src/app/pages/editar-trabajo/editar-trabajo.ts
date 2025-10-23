import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { CardItem } from '../../components/card-item/card-item';

interface Post {
  id: number;
  title: string;
  body: string;
  status: boolean;
  user_id: number;
  createdAt: string;
  pay: number;
  deadline: string;
  location: string;
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-editar-trabajo',
  standalone: true,
  imports: [CommonModule, FormsModule, CardItem],
  templateUrl: './editar-trabajo.html',
  styleUrls: ['./editar-trabajo.css'],
})
export class EditarTrabajoComponent {
  tab: 'editar' | 'solicitudes' | 'contratos' = 'editar';

  post: Post = {
    id: 1,
    title: 'Desarrollador Frontend Angular',
    body: 'Se busca desarrollador con experiencia en Angular y Bootstrap 5.',
    status: true,
    user_id: 1,
    createdAt: '2025-10-19T10:00',
    pay: 5000.0,
    deadline: '2025-11-01',
    location: 'Monterrey, Nuevo León',
  };

  categories: Category[] = [
    { id: 1, name: 'Desarrollo web' },
    { id: 2, name: 'Diseño gráfico' },
    { id: 3, name: 'Redacción de contenido' },
  ];
  selectedCategory = this.categories[0].id;

  solicitudes = [
    { nombre: 'Carlos López', ubicacion: 'Centro', categoria: 'Diseño', fecha: '10/10/2025', estado: 'Pendiente' },
    { nombre: 'María Pérez', ubicacion: 'Norte', categoria: 'Desarrollo', fecha: '11/10/2025', estado: 'Aceptada' },
  ];

  contratos = [
    { titulo: 'Contrato Diseño Web', trabajador: 'María Pérez', fechaInicio: '11/10/2025', fechaFin: '20/10/2025', estado: 'Activo' },
    { titulo: 'Contrato App Angular', trabajador: 'Carlos López', fechaInicio: '05/10/2025', fechaFin: '18/10/2025', estado: 'Completado' },
  ];

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  onEstadoSolicitud(event: { id?: number; nuevoEstado: string }) {
  console.log('Solicitud actualizada:', event);
  // Aquí puedes actualizar el backend
}

onEstadoContrato(event: { id?: number; nuevoEstado: string }) {
  console.log('Contrato actualizado:', event);
  // Aquí también puedes actualizar el backend
}

getItemSolicitud(s: any) {
  return { ...s, tipo: 'solicitud' };
}

getItemContrato(c: any) {
  return { ...c, tipo: 'contrato' };
}

}
