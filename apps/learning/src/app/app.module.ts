import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { OnMapsComponent } from "./comps/on-maps/on-maps.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path:'', component: OnMapsComponent
      }
    ], {initialNavigation: 'enabledBlocking'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
