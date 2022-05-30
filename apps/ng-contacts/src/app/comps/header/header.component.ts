import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { openEditContactDialog } from "../edit-contact/edit-contact.component";
import { filter, take } from "rxjs";

@Component({
  selector: 'comp-store-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchOn = false;
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private cd: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  toggleSearch() {
    this.searchOn = !this.searchOn;
    if (this.searchOn) {
      this.cd.detectChanges();
      this.searchInput.nativeElement.focus();
    }
  }

  addContact() {
    openEditContactDialog(this.dialog, {
      name: '',
      phone: '',
      email: ''
    })
      .pipe(
        take(1),
        filter(val => !!val)
      )
      .subscribe(
        val => console.log('=c=>', val)
      )
  }
}
