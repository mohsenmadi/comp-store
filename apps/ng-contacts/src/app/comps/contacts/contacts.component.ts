import {
  Component, EventEmitter, Output,
} from '@angular/core';
import { Contact } from "@comp-store/data-model";
import { filter, take } from "rxjs";
import { openEditContactDialog } from "../edit-contact/edit-contact.component";
import { MatDialog } from "@angular/material/dialog";
import { ContactsStore } from "@comp-store/comp-store";

// no longer need ngOnInit/onChanges

@Component({
  selector: 'comp-store-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  @Output() emitUpdate = new EventEmitter<Contact>();
  @Output() emitDelete = new EventEmitter<Contact>();

  dataSource = this.store.contactsFiltered$;
  displayedColumns = ['name', 'phone', 'email', 'edit', 'delete'];

  constructor(private dialog: MatDialog, private store: ContactsStore) {}

  updateContact(contact:Contact) {
    openEditContactDialog(this.dialog, contact)
      .pipe(
        take(1),
        filter(val => !!val)
      )
      .subscribe(contact => this.emitUpdate.emit(contact))
  }

  deleteContact(contact:Contact) {
    this.emitDelete.emit(contact);
  }
}
