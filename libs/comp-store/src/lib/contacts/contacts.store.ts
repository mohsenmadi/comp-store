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

  // store ops

  readonly loadContacts = this.updater((state, contacts: Contact[] | null) => ({
    ...state,
    contacts: contacts || []
  }));

  readonly contactsFiltered$ = this.select(({contacts, searchStr}) =>
    contacts.filter((contact: Contact) =>
      JSON.stringify(contact).toLowerCase().includes(searchStr))
  );

  // api service ops

  initContacts() {
    this.apiService.all()
      .pipe(take(1))
      .subscribe(contacts => this.loadContacts(contacts));
  }

  deleteContact(contact: Contact) {
    this.doRestOp(this.apiService.delete(contact));
  }

  createContact(contact: Contact) {
    this.doRestOp(this.apiService.create(contact));
  }

  updateContact(contact: Contact) {
    this.doRestOp(this.apiService.update(contact));
  }

  doRestOp(obs: Observable<any> = this.apiService.all()) {
    obs.pipe(
      take(1)
    ).subscribe(contacts => this.patchState({contacts}));
  }
}
