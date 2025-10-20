import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ver-perfil',
  imports: [],
  templateUrl: './ver-perfil.html',
  styleUrl: './ver-perfil.css'
})
export class VerPerfilComponent {
  user: User = {
    id: 1,
    name: 'Diego',
    last_name: 'Martínez',
    gender: 'masculino',
    description: 'Desarrollador web apasionado por el código limpio.',
    address: 'Guadalajara, Jalisco, México',
    birthday: '2002-07-15',
  };

  contacts: Contact[] = [
    { id: 1, value: 'diego@example.com' },
    { id: 2, value: '+52 555 123 4567' },
  ];

  posts: Post[] = [
    { id: 1, title: 'Diseño de Base de Datos', status: true },
    { id: 2, title: 'Optimización de consultas SQL', status: true },
  ];

  constructor(private location: Location) {}

   goBack(): void {
    this.location.back();
  }

}
