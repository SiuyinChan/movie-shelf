import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SidebarModule } from "../../shared/sidebar/sidebar.module";
import { AppLayoutComponent } from "./app-layout.component";
import { NavbarModule } from "../../shared/navbar/navbar.module";
import { SearchbarModule } from "../../shared/searchbar/searchbar.module";
import { UserCapsuleModule } from "../../shared/user-capsule/user-capsule.module";

@NgModule({
  declarations: [AppLayoutComponent],
  imports: [
    CommonModule,
    SidebarModule,
    NavbarModule,
    SearchbarModule,
    UserCapsuleModule,
  ],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule {
}
