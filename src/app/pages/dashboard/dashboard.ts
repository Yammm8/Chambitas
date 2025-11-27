import { Component } from '@angular/core';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card';
import { Router, RouterLink } from "@angular/router";
import { Job } from '../../services/job';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardCardComponent, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  posts: Post[] = [];
  userId!: number;

  constructor(
    private router: Router,
    private jobService: Job,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.authService.getUserData().subscribe((user: User) => {
      this.userId = user.id;

      this.jobService.getTrabajos().subscribe((data: Post[]) => {
        this.posts = data.filter(job => job.user_id === this.userId);
      });

    });

  }

}
