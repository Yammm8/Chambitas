import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { PostService, Post } from '../../services/post.service';
import { userService } from '../../services/user.service';
import {
  ApplicationService,
  Application,
} from '../../services/application.service';
import { Job } from '../../services/job';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, RouterModule],
  templateUrl: './job-detail.html',
  styleUrls: ['./job-detail.css'],
})
export class JobDetailComponent implements OnInit {
  job: Post | null = null;
  cargando = false;
  error: string | null = null;
  categories: Category[] = [];

  // sesión / dueño
  loggedIn = false;
  esPropietario = false;

  // estado de aplicar
  aplicando = false;
  errorAplicacion = '';
  exitoAplicacion = false;
  yaAplico = false;
  revisandoAplicacion = false; // para bloquear mientras consultamos

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userSvc: userService,
    private router: Router,
    private applicationService: ApplicationService,
    private jobService: Job,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (!id) {
      this.error = 'Id de trabajo inválido.';
      return;
    }

    this.jobService.getCategories().subscribe((data: Category[]) => {
    this.categories = data;
  });

    this.cargarTrabajo(id);

  }

  private cargarTrabajo(id: number): void {
    this.cargando = true;
    this.error = null;

    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.job = post;
        this.cargando = false;

        console.log('Job cargado en detalle:', this.job);

        // calcular sesión / dueño
        this.actualizarFlagsDeUsuario();

        // si está loggeado y NO es el dueño → revisar si ya aplicó
        if (this.loggedIn && !this.esPropietario && this.job) {
          this.verificarSiYaAplico(this.job.id);
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudo cargar la información del trabajo.';
        this.cargando = false;
      },
    });
  }
  

  /** Calcula si hay usuario logueado y si es dueño del trabajo */
  private actualizarFlagsDeUsuario(): void {
    const currentUser: any = this.userSvc.getUsuario();

    this.loggedIn = !!currentUser;

    if (this.loggedIn && this.job) {
      this.esPropietario = currentUser.id === this.job.user_id;
    } else {
      this.esPropietario = false;
    }

    console.log(
      'loggedIn:',
      this.loggedIn,
      'esPropietario:',
      this.esPropietario
    );
  }

  /**
   * Pregunta al backend (vía getMyApplications) si este usuario
   * ya tiene una aplicación para este post.
   */
  private verificarSiYaAplico(postId: number): void {
    this.revisandoAplicacion = true;
    this.yaAplico = false;
    this.errorAplicacion = '';
    this.exitoAplicacion = false;

    this.applicationService.getMyApplications().subscribe({
      next: (apps: Application[]) => {
        // El backend manda Post/User en mayúscula
        this.yaAplico = apps.some((a) => {
          const post: any = a.Post || (a as any).post || {};
          // Por si acaso comparamos por post_id y por id del objeto Post
          return a.post_id === postId || post.id === postId;
        });

        this.revisandoAplicacion = false;
        console.log('Ya aplicó?', this.yaAplico);
      },
      error: (err) => {
        console.error('Error verificando aplicación:', err);
        this.revisandoAplicacion = false;
        // si falla, dejamos el botón habilitado pero sin crashear
      },
    });
  }

 /** Ir al perfil del empleador */
verPerfil(): void {
  if (!this.job) return;

  // ⚠️ IMPORTANTE: usamos SIEMPRE el user anidado para el state
  const employer = this.job.user;

  // Si por alguna razón no viene el user anidado, usamos el user_id
  const userId = employer?.id ?? this.job.user_id;

  console.log('Navegando a perfil de empleador', {
    employer,
    userId,
    job: this.job,
  });

  if (!userId) return;

  this.router.navigate(['/verPerfil', userId], {
    state: { userFromJob: employer }, // 👈 VerPerfil lo lee aquí
  });
}

  /** Crear aplicación al trabajo (si está logueado y no es dueño) */
  aplicarAlTrabajo(): void {
    if (!this.job || this.aplicando || this.yaAplico) return;

    this.aplicando = true;
    this.errorAplicacion = '';
    this.exitoAplicacion = false;

    this.applicationService.createApplication(this.job.id).subscribe({
      next: () => {
        this.aplicando = false;
        this.exitoAplicacion = true;
        this.yaAplico = true;
        console.log('Aplicación creada correctamente');
      },
      error: (err) => {
        console.error(err);
        this.aplicando = false;

        if (err.status === 409) {
          // backend dice: ya existe aplicación
          this.yaAplico = true;
          this.exitoAplicacion = false;
          this.errorAplicacion =
            'Ya aplicaste a este trabajo anteriormente.';
        } else {
          this.errorAplicacion = 'No se pudo enviar tu aplicación.';
        }
      },
    });
  }

  getCategoryName(id?: number): string {
    if (!id) return 'Sin categoría';
    const cat = this.categories.find(c => c.id === id);
    return cat ? cat.name : 'Sin categoría';
  }

  fixDate(dateStr: string): Date {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + 1);
    return d;
  }

}
