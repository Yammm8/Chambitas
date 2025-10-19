import { Injectable } from '@angular/core';

export interface UserDetail{
  id: number,
  name: string,
  last_name: string,
  password: string,
  gender: string,
  description: string,
  birthday: string
  contacts: ContactDetail[]
}

export interface ContactDetail {
  type: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class User {
  private usuario: UserDetail = {
    id: 1,
    name: "Yamir Noel",
    last_name: "Jacinto Bartolo",
    password: "12345678",
    gender: "Male",
    description: "Desarrollador Web",
    birthday: "08/01/2005",
    contacts: [
      {type: "Email", value: "yamir.jb@gmail.com"},
      {type: "Telefono", value: "9511234567"}
    ]
  }

  getUsuario(){
    return this.usuario;
  }
}
