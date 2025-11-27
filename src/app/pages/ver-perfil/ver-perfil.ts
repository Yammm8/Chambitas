import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ver-perfil',
  imports: [],
  templateUrl: './ver-perfil.html',
  styleUrl: './ver-perfil.css'
})
export class VerPerfilComponent {
  userId!: number;

  user: User = {
    id: 1,
    name: 'Diego',
    last_name: 'Martínez',
    gender: 'masculino',
    email: '',
    description: 'Desarrollador web apasionado por el código limpio.',
    address: 'Guadalajara, Jalisco, México',
    birthday: '2002-07-15',
  };
  

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.authService.getUserById(this.userId).subscribe(data => {
    this.user = data;
    this.contacts = data.contact!;
  });
  }

  contacts: Contact[] = [
    { id: 1, contactMeansId: 1, userId: this.user.id, value: 'diego@example.com' },
    { id: 2, contactMeansId: 2, userId: this.user.id, value: '+52 555 123 4567' },
  ];

  posts: Post[] = [
    {
    id: 1,
    title: 'Desarrollador Frontend Angular',
    body: 'Se busca desarrollador con experiencia en Angular y Bootstrap 5.',
    status: true,
    user_id: 1,
    createdAt: '2025-10-19T10:00',
    pay: 5000.0,
    deadline: '2025-11-01',
    location: 'Monterrey, Nuevo León',
  },
    {
    id: 2,
    title: 'Desarrollador Frontend React',
    body: 'Se busca desarrollador con experiencia en react y tailwind 4.',
    status: true,
    user_id: 1,
    createdAt: '2025-10-19T10:00',
    pay: 5000.0,
    deadline: '2025-11-01',
    location: 'Monterrey, Nuevo León',
  },
  ];

  constructor(private location: Location, private route: ActivatedRoute, private authService: AuthService) {}

   goBack(): void {
    this.location.back();
  }

}
