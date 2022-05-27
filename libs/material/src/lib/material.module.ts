import { NgModule } from '@angular/core';
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  exports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
})
export class MaterialModule {}
