import { Component, OnInit } from '@angular/core';
import { take } from "rxjs";
import { ContactsService } from "@comp-store/data-api";
import { ContactsStore } from "@comp-store/comp-store";

@Component({
  selector: 'comp-store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ContactsStore] // having the provider here makes this like a global store
})
export class AppComponent implements OnInit {
  constructor(private service: ContactsService, private store: ContactsStore) {
  }

  ngOnInit() {
    this.service.all()
      .pipe(take(1))
      .subscribe((contacts) => {
          this.store.loadContacts(contacts);
        }
      );
  }
}
