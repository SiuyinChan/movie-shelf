import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar.component";
import { SearchbarModule } from "../searchbar/searchbar.module";
import { UserCapsuleModule } from "../user-capsule/user-capsule.module";

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    SearchbarModule,
    UserCapsuleModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule {

}
