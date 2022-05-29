import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comp-store-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchOn = false;
  constructor() {}

  ngOnInit(): void {}

  toggleSearch() {
    this.searchOn = !this.searchOn;
  }
}
