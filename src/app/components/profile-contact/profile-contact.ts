import { Component, Input } from '@angular/core';
import { ContactDetail } from '../../services/user';

@Component({
  selector: 'app-profile-contact',
  imports: [],
  templateUrl: './profile-contact.html',
  styleUrl: './profile-contact.css'
})
export class ProfileContact {
  @Input() contacts: ContactDetail[] = [];
}
