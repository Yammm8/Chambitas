import { Component, OnInit } from '@angular/core';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card';
import { RouterLink } from '@angular/router';
import { PostService, Post } from '../../services/post.service';

@Component({
  selector: 'app-dashboard',
  // si ya te compilaba antes, déjalo así;
  // si en algún momento se queja Angular, agregamos standalone: true
  imports: [DashboardCardComponent, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (res: Post[]) => {
        this.posts = res;
      },
      error: (err: unknown) => {
        console.error('Error al cargar trabajos:', err);
      },
    });
  }
}
