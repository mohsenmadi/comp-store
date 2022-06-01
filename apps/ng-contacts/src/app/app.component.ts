import { Component, OnInit } from '@angular/core';
import { Contact } from "@comp-store/data-model";
import { map, Observable, take } from "rxjs";
import { ContactsService } from "@comp-store/data-api";

@Component({
  selector: 'comp-store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contacts$!: Observable<Contact[]>;
  contactsFiltered$: any;
  searchStr = '';

  constructor(private service: ContactsService) {
  }

  ngOnInit() {
    this.prepViewData();
  }

  prepViewData() {
    this.contacts$ = this.service.all();
    this.contactsFiltered$ = this.contacts$;
    this.searchKeys(this.searchStr);
  }

  searchKeys(searchKeys: any) {
    this.searchStr = searchKeys;
    this.contactsFiltered$ = this.contacts$
      .pipe(
        take(1),
        map((contacts: any) =>
          contacts.filter((contact: Contact) =>
            JSON.stringify(contact).toLowerCase().includes(searchKeys))
        ));
  }

  onAdd(contact: Contact) {
    this.service.create(contact)
      .pipe(
        take(1)
      )
      .subscribe(() => this.prepViewData());
  }

  onUpdate(contact: Contact) {
    this.service.update(contact)
      .pipe(
        take(1)
      )
      .subscribe(() => this.prepViewData());
  }

  onDelete(contact: Contact) {
    this.service.delete(contact)
      .pipe(
        take(1)
      )
      .subscribe(() => this.prepViewData());
  }
}
