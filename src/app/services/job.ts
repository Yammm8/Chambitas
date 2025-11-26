import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService, Post } from './post.service';

// Reutilizamos el tipo Post para los trabajos del home
export type JobDetail = Post;

@Injectable({
  providedIn: 'root'
})
export class Job {

  constructor(private postService: PostService) {}

  /**
   * Obtiene trabajos desde el backend.
   * limit = cuántos trabajos quieres
   * page = página (el backend está usando 0 como primera página)
   */
  getTrabajos(limit: number = 6, page: number = 0): Observable<JobDetail[]> {
    return this.postService.getPosts(limit, page);
  }
}
