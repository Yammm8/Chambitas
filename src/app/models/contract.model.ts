export interface Contract {
  id: number;
  start_date: string;
  end_date: string;
  status: string; // "activo", "completo", etc.
  post_id: number;
  worker_id: number;
  employer_id: number;
  createdAt: string;
  updatedAt: string;

  post: Post;
  worker: User;
}
