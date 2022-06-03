import { Contact } from "@comp-store/data-model";
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

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
  constructor() {
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
}
