import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SidebarModule } from "../../shared/sidebar/sidebar.module";
import { AppLayoutComponent } from "./app-layout.component";
import { NavbarModule } from "../../shared/navbar/navbar.module";

@NgModule({
  declarations: [AppLayoutComponent],
    imports: [
        CommonModule,
        SidebarModule,
        NavbarModule,
    ],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule {
}
