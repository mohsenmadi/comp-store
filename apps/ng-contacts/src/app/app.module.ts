import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AddContactComponent } from './comps/add-contact/add-contact.component';
import { ContactsComponent } from './comps/contacts/contacts.component';
import { HeaderComponent } from './comps/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    AddContactComponent,
    ContactsComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
