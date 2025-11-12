import { Injectable } from '@angular/core';

export interface UserDetail{
  id?: number,
  name: string,
  last_name: string,
  password: string,
  password_confirmation: string,
  gender: string,
  email: string,
  description?: string,
  birthday: Date | string,
  address: string,
  contacts?: ContactDetail[]
}

export interface ContactDetail {
  type: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class userService {
  private usuario: User | null = null; 

  getUsuario(){
    return this.usuario;
  }

  setUsuario(user: User){
    this.usuario = user;
  }

  clearUsuario(){
    this.usuario = null;
  }
}
