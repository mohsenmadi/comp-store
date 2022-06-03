import { Contact } from "@comp-store/data-model";
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ContactsService } from "@comp-store/data-api";
import { Observable, take } from "rxjs";

export interface ContactsState {
  contacts: Contact[];
  searchStr: string;
}

const defaultState: ContactsState = {
  contacts: [],
  searchStr: ''
};

@Injectable()
export class ContactsStore extends ComponentStore<ContactsState> {
  constructor(private apiService: ContactsService) {
    super(defaultState);
  }

  readonly loadContacts = this.updater((state, contacts: Contact[] | null) => ({
    ...state,
    contacts: contacts || []
  }));

  readonly contactsFiltered$ = this.select(({contacts, searchStr}) =>
    contacts.filter((contact: Contact) =>
      JSON.stringify(contact).toLowerCase().includes(searchStr))
  );

  deleteContact(contact: Contact) {
    this.doRestOp(this.apiService.delete(contact));
  }

  createContact(contact: Contact) {
    this.doRestOp(this.apiService.create(contact));
  }

  updateContact(contact: Contact) {
    this.doRestOp(this.apiService.update(contact));
  }

  private doRestOp(obs: Observable<any>) {
    obs.pipe(
      take(1)
    ).subscribe(contacts => this.loadContacts(contacts));
  }
}
