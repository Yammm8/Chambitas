interface User {
  id: number;
  name: string;
  last_name: string;
  gender: string;
  description: string;
  email: string;
  address: string;
  birthday: string;
  contact?: Contact[];
  post?: Post[];
}
