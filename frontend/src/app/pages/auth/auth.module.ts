import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SidebarModule } from "../../shared/sidebar/sidebar.module";
import { AppLayoutModule } from "../../layouts/app-layout/app-layout.module";
import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    SidebarModule,
    AppLayoutModule,
    ReactiveFormsModule
  ],
  exports: [AuthComponent]
})
export class AuthModule {
}
