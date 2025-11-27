import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; // 👈 Importar DatePipe y CurrencyPipe si usas $
import { ActivatedRoute } from '@angular/router';
import { Job } from '../../services/job';
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
  job!: Post;
  jobId!: number;
  loggedIn: boolean = false;

  constructor(private route: ActivatedRoute, private jobService: Job, private authService : AuthService) { 
    this.authService.isLoggedIn().subscribe(isAuth => {
  this.loggedIn = isAuth;
});

  } 

  ngOnInit() {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.jobService.getTrabajoPorId(this.jobId).subscribe(data => {
    this.job = data;
    console.log("DATA QUE LLEGA A LA LISTA:", data);
  });
  }


  aplicar() {
    console.log('Aplicando a:', this.job.title);
  }
}
