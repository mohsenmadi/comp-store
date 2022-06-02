import {
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import { Contact } from "@comp-store/data-model";
import { filter, Observable, take } from "rxjs";
import { openEditContactDialog } from "../edit-contact/edit-contact.component";
import { MatDialog } from "@angular/material/dialog";
import { ContactsStore } from "@comp-store/comp-store";

@Component({
  selector: 'comp-store-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnChanges {
  @Output() emitUpdate = new EventEmitter<Contact>();
  @Output() emitDelete = new EventEmitter<Contact>();

  dataSource: any;
  displayedColumns = ['name', 'phone', 'email', 'edit', 'delete'];

  constructor(private dialog: MatDialog, private store: ContactsStore) {}

  ngOnInit(): void {
    this.dataSource = this.store.contactsFiltered$;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = this.store.contactsFiltered$;
  }

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
