import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import {
  userService,
  UserDetail,
  ContactDetail,
} from '../../services/user.service';
import { PostService, Post } from '../../services/post.service';

@Component({
  selector: 'app-ver-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './ver-perfil.html',
  styleUrl: './ver-perfil.css',
})
export class VerPerfilComponent implements OnInit {
  user: UserDetail | null = null;
  contacts: ContactDetail[] = [];
  posts: Post[] = [];

  isOwnProfile = false;
  loading = false;
  error = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private userSvc: userService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    // 👇 Intentamos leer el state de la navegación ACTUAL
    const nav = this.router.getCurrentNavigation();
    const navState = (nav?.extras?.state || {}) as { userFromJob?: any };

    // Si por alguna razón getCurrentNavigation es null (por recargas, etc.),
    // usamos history.state como respaldo
    const stateUser = navState.userFromJob ?? (history.state as any).userFromJob ?? null;

    const currentUser = (this.userSvc.getUsuario() as any) as UserDetail | null;

    console.log('VerPerfil init =>', {
      idParam,
      stateUser,
      currentUser,
      historyState: history.state,
    });

    // 1) PERFIL DE EMPLEADOR viniendo de JobDetail (tiene state.userFromJob)
    if (stateUser) {
      this.cargarPerfilDesdeJob(stateUser, currentUser);
      return;
    }

    // 2) PERFIL PROPIO (ruta /Perfil o /verPerfil SIN id)
    if (!idParam && currentUser) {
      this.cargarPerfilPropio(currentUser);
      return;
    }

    // 3) Fallback: /verPerfil/:id escrito a mano que coincide con el usuario logueado
    if (idParam && currentUser && Number(idParam) === currentUser.id) {
      this.cargarPerfilPropio(currentUser);
      return;
    }

    // 4) Si llegamos aquí y no tenemos stateUser ni usuario actual coherente
    this.error = 'No se pudo cargar el perfil solicitado.';
  }

  // ---------- helpers ----------

  private cargarPerfilPropio(currentUser: UserDetail): void {
    this.isOwnProfile = true;
    this.user = currentUser;
    this.contacts = currentUser.contacts ?? [];
    this.cargarMisPublicaciones();
  }

  private cargarPerfilDesdeJob(
    stateUser: any,
    currentUser: UserDetail | null
  ): void {
    this.isOwnProfile = !!(currentUser && currentUser.id === stateUser.id);

    // armamos un UserDetail a partir del user que vino en el job
    this.user = {
      id: stateUser.id,
      name: stateUser.name,
      last_name: stateUser.last_name,
      email: stateUser.email ?? '',
      gender: stateUser.gender ?? '',
      description: stateUser.description ?? 'Sin descripción',
      birthday: stateUser.birthday ?? '',
      address: stateUser.address ?? 'Sin dirección',
      contacts: [],
      password: '',
      password_confirmation: '',
    };

    this.contacts = [];

    if (this.isOwnProfile) {
      // si casualmente estás viendo TU propio trabajo, sí mostramos tus publicaciones
      this.cargarMisPublicaciones();
    } else {
      this.posts = []; // dejamos vacío para no mostrar cosas viejas
    }
  }

  private cargarMisPublicaciones(): void {
    this.loading = true;
    this.postService.getPostsByUser().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
