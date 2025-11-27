import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ContactBackend, userService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

interface ContactMeans {
  id: number;
  type: string;
}

@Component({
  selector: 'app-profile-contact',
  imports: [FormsModule],
  templateUrl: './profile-contact.html',
  styleUrl: './profile-contact.css'
})
export class ProfileContact implements OnInit {

  contacts: Contact[] = [];

  contactMeans: ContactMeans[] = [
    { id: 1, type: "Email" },
    { id: 2, type: "Celular" },
    { id: 3, type: "Facebook" },
    { id: 4, type: "Instagram" },
    { id: 5, type: "LinkedIn" },
  ];

  formData = {
    contact_means_id: '',
    value: ''
  };

  constructor(private userService: userService) {}

  ngOnInit() {
    this.userService.getContacts().subscribe((data: ContactBackend[]) => {
  this.contacts = data.map(c => ({
    id: c.id,
    contactMeansId: c.contact_means_id,
    value: c.value,
    type: this.contactMeans.find(x => x.id === c.contact_means_id)?.type
  }));
});
  }

  onSubmit() {
    if (!this.formData.contact_means_id || !this.formData.value.trim()) {
      Swal.fire("Error", "Completa todos los campos.", "error");
      return;
    }

    const payload = {
      contact_means_id: Number(this.formData.contact_means_id),
      value: this.formData.value.trim()
    };

    this.userService.addContact(payload).subscribe({
      next: (res: any) => {
        Swal.fire("¡Listo!", "Contacto agregado correctamente", "success");

        const newId = res?.id || Math.floor(Math.random() * 100000);

        this.contacts.push({
          id: newId,
          contactMeansId: payload.contact_means_id,
          value: payload.value,
          type: this.getContactType(payload.contact_means_id)
        });

        this.formData = { contact_means_id: '', value: '' };
      },
      error: (err) => {
        const mensaje = err?.error?.error || "No se pudo agregar el contacto";
        Swal.fire({ title: "Error", text: mensaje, icon: "error" });
        console.error("ERROR al agregar contacto:", err);
      }
    });
  }

  eliminarContacto(contactId: number) {
    Swal.fire({
      title: "¿Eliminar?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar"
    }).then(result => {
      if (!result.isConfirmed) return;

      this.userService.deleteContact(contactId).subscribe({
        next: () => {
          Swal.fire("Eliminado", "Contacto eliminado correctamente", "success");
          this.contacts = this.contacts.filter(c => c.id !== contactId);
        },
        error: (err) => {
          const mensaje = err?.error?.error || "No se pudo eliminar el contacto";
          Swal.fire({ title: "Error", text: mensaje, icon: "error" });
          console.error("ERROR al eliminar contacto:", err);
        }
      });
    });
  }

  getContactType(id: number): string {
    return this.contactMeans.find(x => x.id === id)?.type || "Desconocido";
  }

}
