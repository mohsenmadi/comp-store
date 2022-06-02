import { Contact } from "@comp-store/data-model";
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

export interface ContactsState {
  contacts: Contact[];
}

const defaultState: ContactsState = {
  contacts: []
};

@Injectable()
export class ContactsStore extends ComponentStore<ContactsState> {
  constructor() {
    super(defaultState);
  }

  readonly contacts$ = this.select(state => state.contacts);

  readonly loadContacts = this.updater((state, contacts: Contact[] | null) => ({
    ...state,
    contacts: contacts || []
  }));
}
