import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],   // 👈 AQUI ESTÁ LA SOLUCIÓN
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Aquí iría tu lógica de autenticación (servicio, backend, etc.)
  }
}
