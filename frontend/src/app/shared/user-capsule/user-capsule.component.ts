import { Component, HostListener } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-capsule',
  templateUrl: './user-capsule.component.html',
  styleUrls: ['./user-capsule.component.scss']
})
export class UserCapsuleComponent {
  showDropdownMenu: boolean = false;
  isLogged: boolean = false;

  constructor(private readonly router: Router) {
    this.isLogged = !!sessionStorage.getItem('token');
  }

  public toggleDropdownMenu(event: Event) {
    event.stopImmediatePropagation();
    this.showDropdownMenu = !this.showDropdownMenu;
  }

  public navigateLogin() {
    this.router.navigate(['auth', 'login']).then();
  }

  public navigateRegister() {
    this.router.navigate(['auth', 'register']).then();
  }

  public navigateProfile() {
    this.router.navigate(['profile', 'information']).then();
  }

  public navigateLogout() {
    sessionStorage.removeItem('token');
    this.isLogged = false;
    this.router.navigate(['discover', 'popular']).then();
  }

  @HostListener('document:click', ['$event'])
  public outsideClick(): void {
    this.showDropdownMenu = false;
  }
}
