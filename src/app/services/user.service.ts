import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

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

export interface PersonalInfoForm {
  name: string;
  last_name: string;
  email: string;
  address: string;
}

export interface ProfileDetailsForm {
  gender: string;
  birthday: string;
  description: string;
}

export interface AddContactForm {
  contact_means_id: number;
  value: string;
}

export interface ContactDetail {
  type?: string;
  value: string;
}

export interface AddContactPayload {
  contact_means_id: number;
  value: string;
}

export interface ContactBackend {
  id: number;
  contact_means_id: number;
  user_id: number;
  value: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class userService {
  private baseUrl = environment.apiUrl;
  private router = inject(Router);
  private http = inject(HttpClient);

  private usuarioSubject = new BehaviorSubject<User | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  getUsuario() {
    return this.usuarioSubject.value;
  }

  setUsuario(user: User) {
    this.usuarioSubject.next(user);
  }

  clearUsuario() {
    this.usuarioSubject.next(null);
  }

  updatePersonalInfo(payload: PersonalInfoForm): Observable<User> {
    return this.http.patch<User>(
      `${this.baseUrl}/user/update-personalInf`,
      payload,
      { withCredentials: true,
        responseType: 'text' as 'json'
       }
    ).pipe(
      tap((updatedUser) => {
        this.usuarioSubject.next(updatedUser);
      })
    );
  }

  updateProfileDetails(payload: ProfileDetailsForm): Observable<any> {
  return this.http.patch(
      `${this.baseUrl}/user/update-profile`,
      payload,
      {
        withCredentials: true,
        responseType: 'text' as 'json'
      }
    );
}

getMyContacts(): Observable<ContactDetail[]> {
  return this.http.get<ContactDetail[]>(`${this.baseUrl}/user/contacts`, {
    withCredentials: true
  });
}

  addContact(payload: AddContactPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/add-contact`, payload, {
      withCredentials: true,
      responseType: 'text' as 'json'
    });
  }

  deleteContact(contactId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/user/delete-contact/${contactId}`, { withCredentials: true, responseType: 'text' as 'json' });
  }

  updateContact(contactId: number, payload: Partial<AddContactPayload>): Observable<any> {
    return this.http.patch(`${this.baseUrl}/user/update-contact/${contactId}`, payload, {
      withCredentials: true,
      responseType: 'text' as 'json'
    });
  }

  getContacts(): Observable<ContactBackend[]> {
  return this.http.get<ContactBackend[]>(`${this.baseUrl}/user/contacts`, { withCredentials: true});
}



}