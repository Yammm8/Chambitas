import { Component } from '@angular/core';
import { userService, PersonalInfoForm } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-personal',
  imports: [FormsModule],
  templateUrl: './profile-personal.html',
  styleUrl: './profile-personal.css'
})
export class ProfilePersonal {

  usuario: any = null;

  formData = {
    name: '',
    last_name: '',
    email: '',
    address: '',
  };

  constructor(private userService: userService, private router: Router) {}

  ngOnInit() {
    this.usuario = this.userService.getUsuario();

    if (this.usuario) {
      this.formData = {
        name: this.usuario.name || '',
        last_name: this.usuario.last_name || '',
        email: this.usuario.email || '',
        address: this.usuario.address || '',
      };
    }
  }

  isFormValid() {
    return (
      this.formData.name.trim() !== '' &&
      this.formData.last_name.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.address.trim() !== ''
    );
  }

  onSubmit() {

    const payload: PersonalInfoForm = {
      name: this.formData.name.trim(),
      last_name: this.formData.last_name.trim(),
      email: this.formData.email.trim(),
      address: this.formData.address.trim()
    };

    this.userService.updatePersonalInfo(payload).subscribe({

      next: (resp) => {
        Swal.fire({
          title: '¡Datos actualizados!',
          text: 'Tu información personal se ha guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/profile']);
        });
      },

      error: (err) => {
  let backendMsg = "Hubo un problema al actualizar tus datos.";

  // Caso 1: { error: "mensaje" }
  if (err?.error?.error) {
    backendMsg = err.error.error;
  }

  // Caso 2: { message: "mensaje" }
  else if (err?.error?.message) {
    backendMsg = err.error.message;
  }

  // Caso 3: { errors: [ "msg1", "msg2" ] }
  else if (Array.isArray(err?.error?.errors)) {
    backendMsg = err.error.errors.join("\n");
  }

  // Caso 4: texto plano
  else if (typeof err?.error === "string") {
    backendMsg = err.error;
  }

  Swal.fire({
    title: 'Error',
    text: backendMsg,
    icon: 'error',
  });

  console.error("Error al actualizar", err);
  console.log(payload);
},

    });
  }

}
