import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { openEditContactDialog } from "../edit-contact/edit-contact.component";
import { filter, take } from "rxjs";
import { emptyContact } from "@comp-store/data-model";
import { ContactsStore } from "@comp-store/comp-store";

@Component({
  selector: 'comp-store-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchOn = false;
  @ViewChild('searchInput') searchInput!: ElementRef;
  searchStr = '';

  constructor(private cd: ChangeDetectorRef,
              private store: ContactsStore,
              private dialog: MatDialog) {
  }

  toggleSearch() {
    this.searchOn = !this.searchOn;
    if (this.searchOn) {
      this.cd.detectChanges();
      this.searchInput.nativeElement.focus();
    }
  }

  addContact() {
    openEditContactDialog(this.dialog, emptyContact)
      .pipe(
        take(1),
        filter(val => !!val)
      ).subscribe(contact => this.store.addContact(contact));
  }

  setSearchStr($event: any) {
    this.searchStr = $event.target.value;
    this.store.searchStrPatch(this.searchStr);
    // this.store.patchState({
    //   searchStr: this.searchStr
    // });
  }

  reload() {
    this.store.init();
  }
}
