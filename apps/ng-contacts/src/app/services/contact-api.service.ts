import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contact } from "@comp-store/data-model";

const URL = 'http://localhost:3333/api/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService {

  constructor(private http:HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(URL);
  }

  createContact(contact: Contact): Observable<Contact[]> {
    return this.http.post<Contact[]>(URL, contact);
  }
}
