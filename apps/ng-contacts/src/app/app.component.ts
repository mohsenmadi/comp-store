import { Component, OnInit } from '@angular/core';
import { Contact } from "@comp-store/data-model";
import { map, Observable, take } from "rxjs";
import { ContactsService } from "@comp-store/data-api";
import { ContactsStore } from "@comp-store/comp-store";

@Component({
  selector: 'comp-store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ContactsStore] // having the provider here makes this like a global store
})
export class AppComponent implements OnInit {
  searchStr = '';

  constructor(private service: ContactsService, private store: ContactsStore) {
  }

  ngOnInit() {
    this.service.all()
      .pipe(take(1))
      .subscribe((contacts) => {
          this.store.loadContacts(contacts);
          this.store.loadContactsFiltered(contacts);
          this.searchKeys(this.searchStr);
        }
      );
  }

  searchKeys(searchKeys: any) {
    this.searchStr = searchKeys;
    this.store.contacts$
      .pipe(
        take(1),
        map((contacts: any) =>
          contacts.filter((contact: Contact) =>
            JSON.stringify(contact).toLowerCase().includes(searchKeys))
        ))
      .subscribe(contacts => this.store.loadContactsFiltered(contacts));
  }

  onAdd(contact: Contact) {
    this.doRestOp(this.service.create(contact));
  }

  onUpdate(contact: Contact) {
    this.doRestOp(this.service.update(contact));
  }

  onDelete(contact: Contact) {
    this.doRestOp(this.service.delete(contact));
  }

  doRestOp(obs: Observable<any>) {
    obs.pipe(
      take(1)
    ).subscribe(() => this.searchKeys(this.searchStr));
  }
}
