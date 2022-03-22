import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { SidebarModule } from "../../shared/sidebar/sidebar.module";
import { AppLayoutModule } from "../../layouts/app-layout/app-layout.module";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    ProfileRoutingModule,
    CommonModule,
    SidebarModule,
    AppLayoutModule,
    ReactiveFormsModule,
  ],
  exports: [ProfileComponent]
})
export class ProfileModule {
}
