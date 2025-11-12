import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from "@angular/router";
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { userService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  // Errores del front
  fieldErrors: { [key: string]: string } = {};

  constructor(private authService: AuthService, private router: Router, private userService: userService) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.fieldErrors = {};

    if (!this.email) {
      this.fieldErrors['email'] = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.fieldErrors['email'] = 'El email no es válido';
    }

    if (!this.password) {
      this.fieldErrors['password'] = 'La contraseña es requerida';
    } else if (this.password.length < 8) {
      this.fieldErrors['password'] = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (Object.keys(this.fieldErrors).length > 0) {
      return;
    }

    // Login real
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.authService.getUserData().subscribe({
          next: (userData: any) => {
            this.userService.setUsuario(userData);
            this.router.navigate(['/dashboard']);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Login exitoso",
              showConfirmButton: false,
              timer: 1500
            });
          },
          error: () => {
            Swal.fire({
              icon: "error",
              title: "Fallo al obtener datos del usuario"
            });
          }
        });
      },
      error: () => {
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas"
        });
      }
    });
  }
}
