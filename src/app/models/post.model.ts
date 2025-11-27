interface Post {
  id: number
  title: string;
  body: string;
  status: boolean;
  user_id: number;
  createdAt: string;
  pay: number;
  deadline: string;
  location: string;
  category_id?: number;
  updatedAt?: string;
  user?: User;
  contact?: Contact[];
  Category?: Category;
}