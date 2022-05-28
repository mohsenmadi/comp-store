import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Contact } from "@comp-store/data-model";
import { Observable } from "rxjs";

@Component({
  selector: 'comp-store-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @Input() contacts!:Observable<Contact[]> | null;
  dataSource: any;
  displayedColumns = ['name', 'phone', 'email', 'edit', 'delete'];

  constructor() {}

  ngOnInit(): void {
    this.dataSource = this.contacts;
  }

  editContact(contact:Contact) {
    console.log('==> edit', contact)
  }

  deleteContact(contact:Contact) {
    console.log('==> delete', contact)
  }
}
