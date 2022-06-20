import { Contact } from "@comp-store/data-model";
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ContactsService } from "@comp-store/data-api";
import { catchError, concatMap, EMPTY, exhaustMap, map, Observable, take, tap, withLatestFrom } from "rxjs";

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

  init() {
    this.loadContacts();
  }

  private readonly loadContacts = this.effect((trigger$) =>
    trigger$.pipe(
      exhaustMap(() =>
        this.apiService.all().pipe(
          tap((contacts) => {
            this.setState((state) => ({...state, contacts}));
          }),
          catchError(() => EMPTY))
      )));
  // private readonly loadContacts = () =>
  //   this.apiService.all()
  //     .pipe(take(1))
  //     .subscribe(contacts => this.setState((state) => ({
  //       ...state,
  //       contacts
  //     })));

  readonly contacts$ =
    this.select(({contacts}) => contacts);

  readonly searchStr$ =
    this.select(({searchStr}) => searchStr);

  readonly contactsFiltered$ = this.select(({contacts, searchStr}) =>
    contacts.filter((contact: Contact) =>
      Object.values(contact).join('').toLowerCase().includes(searchStr)));

  readonly contactsUpdate = this.updater((state, contacts: Contact[]) => ({
    ...state,
    contacts
  }));

  readonly searchStrUpdate = (searchStr: string) =>
    this.patchState({searchStr});

  // "create" api returns created contact
  // once emits a result, combine with store's state$, add, and patchState

  // here, we define the input as an observable of a contact object
  //  will use contactMap to add items in order, along with making a service request
  addContact = this.effect(
    (contact$: Observable<Contact>) =>
      contact$.pipe(
        concatMap((contact) =>
          this.apiService.create(contact).pipe(
            tap((apiContact) => {
              this.setState((state) =>
                ({...state, contacts: [...state.contacts, apiContact]})
              );
            }),
            catchError(() => EMPTY)))
      ));
  // addContact = (contact: Contact) => {
  //   this.apiService.create(contact)
  //     .pipe(
  //       withLatestFrom(this.state$),
  //       map(([apiContact, state]) => ([...state.contacts, apiContact])),
  //       take(1))
  //     .subscribe((contacts: Contact[]) =>
  //       this.patchState({contacts})
  //     );
  // };

  // "update" api returns updated contact
  // once emitted, combine with contacts$ from selector, locate and update through id,
  //   and patchState
  updateContact = (contact: Contact) => {
    this.apiService.update(contact)
      .pipe(
        withLatestFrom(this.contacts$),
        map(([apiContact, contacts]) => {
          const idx = contacts.findIndex(contact => contact.id === apiContact.id);
          const contactsClone = [...contacts];
          contactsClone[idx] = apiContact;
          return contactsClone;
        }),
        take(1)
      )
      .subscribe((contacts: Contact[]) =>
        this.patchState({contacts})
      );
  };

  // "remove" api returns the entire, modified collection
  // once emitted, simply "update" state with new collection
  deleteContact = (contact: Contact) => {
    this.apiService.delete(contact)
      .pipe(take(1))
      .subscribe(contacts => {
        this.contactsUpdate(contacts);
      });
  };
}
