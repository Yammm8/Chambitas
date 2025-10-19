import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job, JobDetail } from '../../services/job';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs-list',
  imports: [FormsModule, CurrencyPipe, CommonModule],
  templateUrl: './jobs-list.html',
  styleUrl: './jobs-list.css'
})
export class JobsListComponent implements OnInit {
  @Input({required: true}) job!: JobDetail;
  private _router = inject(Router);
  goToJob(id: number){
    this._router.navigateByUrl(`job-detail/`+id)
  }

  jobs: JobDetail[] = [];
  cargando: boolean = false;
  error: string | null = null;

  q: string = '';
  categoria: string = '';
  ordenar: string = 'recientes';

  constructor(private router: Router, private jobService: Job) {}

  ngOnInit() {
    // 🔹 Datos simulados (placeholder hasta que el backend esté listo)
    this.jobs = this.jobService.getTrabajos();
  }

  aplicar() {
    // Aquí podrías agregar lógica de filtrado si quieres
    console.log('Filtros aplicados:', this.q, this.categoria, this.ordenar);
  }

  limpiar() {
    this.q = '';
    this.categoria = '';
    this.ordenar = 'recientes';
  }

  verDetalles(id: number) {
    this.router.navigate(['/jobs', id]);
  }
}
