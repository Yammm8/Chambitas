import { Component, OnInit } from '@angular/core';
import { PreviewJobCard } from "../../components/preview-job-card/preview-job-card";
import { Job, JobDetail } from '../../services/job';
import { RouterLink } from "@angular/router";
import { userService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [PreviewJobCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  trabajos: Post[] = [];
  user: User | null = null;

  constructor(private jobService: Job, private userService: userService) {}

  ngOnInit() {

    this.user = this.userService.getUsuario();

    this.jobService.getTrabajosLimit(3, 0).subscribe((data: Post[]) => {

      if (this.user) {
        this.trabajos = data.filter(job => job.user_id !== this.user!.id);
      } else {
        this.trabajos = data;
      }

    });

  }

}
