import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UserCapsuleComponent } from "./user-capsule.component";

@NgModule({
  declarations: [UserCapsuleComponent],
  imports: [
    CommonModule
  ],
  exports: [UserCapsuleComponent]
})
export class UserCapsuleModule {

}
