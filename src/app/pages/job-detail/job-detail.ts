import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; // 👈 Importar DatePipe y CurrencyPipe si usas $
import { ActivatedRoute } from '@angular/router';
import { Job, JobDetail } from '../../services/job';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-job-detail',
  standalone: true, // 👈 Esto es importante para componentes sin NgModule
  imports: [
    CommonModule,   // para directivas básicas (*ngIf, *ngFor)
    DatePipe,       // para usar {{ ... | date }}
    CurrencyPipe,
    RouterModule   // si usas {{ pago | currency }}
  ],
  templateUrl: './job-detail.html',
  styleUrls: ['./job-detail.css'] // 👈 corregido (plural)
})

export class JobDetailComponent implements OnInit {
  job!: JobDetail;
  jobId!: number;
  trabajos: JobDetail[] = [];
  loggedIn: boolean = false;

  constructor(private route: ActivatedRoute, private jobService: Job, private authService : AuthService) { 
    this.loggedIn= this.authService.isLoggedIn()
  } 

  ngOnInit() {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.job = this.obtenerTrabajoPorId(this.jobId);
  }

  obtenerTrabajoPorId(id: number): JobDetail {
    this.trabajos = this.jobService.getTrabajos();
    return this.trabajos.find(job => job.id === id)!;
  }

  aplicar() {
    console.log('Aplicando a:', this.job.titulo);
  }
}
