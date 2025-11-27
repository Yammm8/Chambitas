import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { UserDetail } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegisterComponent {
  name: string = '';
  last_name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';
  gender: 'M' | 'F' | 'O' = 'M';
  birthday: string = '';
  address: string = '';
  aceptarTerminos: boolean = false;
  error: string | null = null;
  fieldErrors: { [key: string]: string } = {};

  showPassword1: boolean = false;
  showPassword2: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword1() {
    this.showPassword1 = !this.showPassword1;
  }

  togglePassword2() {
    this.showPassword2 = !this.showPassword2;
  }

  register() {
    this.error = '';

    if (this.password !== this.password_confirmation) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    if (!this.name || !this.last_name || !this.email || !this.password || !this.gender || !this.birthday) {
      this.error = 'Por favor completa todos los campos obligatorios';
      return;
    }

    if (this.password.length < 8) {
      this.fieldErrors['password'] = 'La contraseña debe tener al menos 8 caracteres';
      return;
    }

    const payload: UserDetail = {
      name: this.name,
      last_name: this.last_name,
      password: this.password,
      password_confirmation: this.password_confirmation,
      gender: this.gender,
      birthday: this.birthday,
      email: this.email,
      address: this.address,
    };


this.authService.register(payload).subscribe({
  next: (res) => {
    console.log('Registro exitoso', res);

    Swal.fire({
      icon: 'success',
      title: 'Cuenta creada correctamente',
      text: 'Tu cuenta fue registrada exitosamente. Ahora puedes iniciar sesión.',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#4CAF50'
    }).then(() => {
      this.router.navigate(['/login']);
    });
  },

  error: (err) => {
    console.log(payload);
    this.error = null;
    this.fieldErrors = {};

    // Errores de validación
    if (err.error?.errors && Array.isArray(err.error.errors)) {

      // Recorremos uno por uno
      err.error.errors.forEach((e: any) => {
        this.fieldErrors[e.path] = e.msg;
      });

      Swal.fire({
        icon: 'warning',
        title: 'Revisa los campos',
        html: err.error.errors
          .map((e: any) => `<b>${e.path}</b>: ${e.msg}`)
          .join('<br>'),
        confirmButtonText: 'Entendido'
      });
    }

    // Error general
    else if (err.error?.error) {
      this.error = err.error.error;

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.error,
        confirmButtonText: 'Ok'
      });
    }

    // Error inesperado
    else {
      this.error = 'Ocurrió un error inesperado';

      Swal.fire({
        icon: 'error',
        title: 'Error inesperado',
        text: 'Por favor intenta de nuevo más tarde.',
        confirmButtonText: 'Ok'
      });
    }
  }
});

  }
}
