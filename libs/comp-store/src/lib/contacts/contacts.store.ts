import { Contact } from "@comp-store/data-model";
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

export interface ContactsState {
  contacts: Contact[];
  contactsFiltered: Contact[];
}

const defaultState: ContactsState = {
  contacts: [],
  contactsFiltered: []
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
  readonly contacts$ = this.select(state => state.contacts);

  readonly loadContactsFiltered = this.updater((state, contactsFiltered: Contact[] | null) => ({
    ...state,
    contactsFiltered: contactsFiltered || []
  }));
  readonly contactsFiltered$ = this.select(({contactsFiltered}) => contactsFiltered);
}
