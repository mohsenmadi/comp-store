import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ContactApiService } from "./services/contact-api.service";
import { Contact } from "@comp-store/data-model";
import { map, Observable, take } from "rxjs";

@Component({
  selector: 'comp-store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contacts$!: Observable<Contact[]>;
  contactsFiltered$: any;

  constructor(private service: ContactApiService) {
  }

  ngOnInit() {
    this.contacts$ = this.service.getContacts();
    this.contactsFiltered$ = this.contacts$;
  }

  searchKeys(searchKeys: any) {
    this.contactsFiltered$ = this.contacts$
      .pipe(
        take(1),
        map((contacts: any) =>
          contacts.filter((contact: Contact) =>
            JSON.stringify(contact).toLowerCase().includes(searchKeys))));
  }

  addNewContact(contact: Contact) {
    console.log('=nc=', contact)
  }
}
