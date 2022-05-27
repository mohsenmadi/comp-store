import { Component, Input, OnInit } from '@angular/core';
import { Contact } from "@comp-store/data-model";

@Component({
  selector: 'comp-store-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  @Input() contacts!:Contact[] | null;

  constructor() {}

  ngOnInit(): void {}
}
