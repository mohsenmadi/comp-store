import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ContactApiService } from "./services/contact-api.service";
import { Contact } from "@comp-store/data-model";
import { Observable } from "rxjs";

@Component({
  selector: 'comp-store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contacts$!:Observable<Contact[]>;
  constructor(private service: ContactApiService) {
  }

  ngOnInit() {
    this.contacts$ = this.service.getContacts();
  }
}
