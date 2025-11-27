import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-contact',
  imports: [],
  templateUrl: './profile-contact.html',
  styleUrl: './profile-contact.css'
})
export class ProfileContact {
  @Input() contacts: Contact[] = [];
}
