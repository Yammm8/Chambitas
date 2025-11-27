import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card';
import { PostService, Post } from '../../services/post.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardCardComponent, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  posts: Post[] = [];

  cargando = false;
  error: string | null = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.cargarTrabajosRecientes();
  }

  cargarTrabajosRecientes(): void {
    this.cargando = true;
    this.error = null;
    this.posts = [];

    // 👉 solo trabajos del usuario logueado
    this.postService.getPostsByUser().subscribe({
      next: (posts) => {
        console.log('postsByUser =>', posts);
        this.posts = posts;
        this.cargando = false;

        if (!posts || posts.length === 0) {
          this.error = 'Aún no tienes trabajos publicados.';
        }
      },
      error: (err) => {
        console.error('Error en postsByUser:', err);
        this.cargando = false;

        // Mensaje amigable; ya NO traemos todos los trabajos
        if (err.status === 404) {
          this.error =
            'El endpoint /postsByUser aún no está disponible en el backend. Ya está apuntando al endpoint correcto, pero el servidor debe implementarlo.';
        } else {
          this.error = 'No se pudieron cargar tus trabajos recientes.';
        }
      },
    });
  }
}
