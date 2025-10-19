import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],  // 👈 IMPORTANTE
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegisterComponent {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  aceptarTerminos: boolean = false;

  showPassword1: boolean = false;
  showPassword2: boolean = false;

  togglePassword1() {
    this.showPassword1 = !this.showPassword1;
  }

  togglePassword2() {
    this.showPassword2 = !this.showPassword2;
  }

  crearCuenta() {
    if (!this.aceptarTerminos) {
      alert('Debes aceptar los términos y condiciones.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    console.log('✅ Cuenta creada con:', {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      password: this.password
    });

    // Aquí iría la lógica real para enviar los datos al backend
  }
}
