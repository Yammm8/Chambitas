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
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ver-perfil',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './ver-perfil.html',
  styleUrl: './ver-perfil.css',
})
export class VerPerfilComponent implements OnInit {
  user: User | null = null;
  contact: Contact[] = [];
  posts: Post[] = [];

  isOwnProfile = false;
  loading = false;
  error = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private userSvc: userService,
    private postService: PostService,
    private authSvc: AuthService,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const nav = this.router.getCurrentNavigation();
    const navState = (nav?.extras?.state || {}) as { userFromJob?: any };

    const stateUser = navState.userFromJob ?? (history.state as any).userFromJob ?? null;
    const currentUser = this.userSvc.getUsuario() as User | null;

    // Caso 1: si vengo desde un job, tomar el id de stateUser
    if (stateUser) {
      this.cargarPerfilPorId(stateUser.id, currentUser);
      return;
    }

    // Caso 2: si NO viene id por URL, significa que es el perfil propio
    if (!idParam && currentUser) {
      this.cargarPerfilPorId(currentUser.id, currentUser);
      return;
    }

    // Caso 3: /verPerfil/:id
    if (idParam) {
      this.cargarPerfilPorId(Number(idParam), currentUser);
      return;
    }

    this.error = 'No se pudo cargar el perfil solicitado.';
  }


  // ---------- helpers ----------

  obtenerNombreContacto(id: number): string {
    switch (id) {
      case 1: return 'Correo';
      case 2: return 'Teléfono';
      case 3: return 'LinkedIn';
      case 4: return 'Instagram';
      default: return 'Otro';
    }
  }
  goToJob(id: number) {
      this.router.navigateByUrl(`job-detail/${id}`);
    }


  private cargarPerfilPorId(id: number, currentUser: User | null): void {
    this.loading = true;

    this.authSvc.getUserById(id).subscribe({
      next: (userData) => {
        this.user = userData;
        this.contact = userData.contact || [];

        this.isOwnProfile = currentUser ? currentUser.id === userData.id : false;

        // 👇 SOLO AQUÍ cargamos posts después de saber el id del user
        this.cargarMisPublicaciones();

        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando usuario:', err);
        this.error = 'No se pudo cargar el perfil solicitado.';
        this.loading = false;
      }
    });
  }


  private cargarMisPublicaciones(): void {
    if (!this.user) return; // por seguridad

    this.loading = true;
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts.filter((job) => job.user_id === this.user?.id);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando publicaciones:', err);
        this.loading = false;
      },
    });
  }


  goBack(): void {
    this.location.back();
  }

  fixDate(dateStr: string): Date {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + 1);
    return d;
  }
}
