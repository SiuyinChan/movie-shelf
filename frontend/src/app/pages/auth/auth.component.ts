import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public authForm: FormGroup;

  public authType!: string;

  constructor(private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly route: ActivatedRoute,
              private readonly authService: AuthService) {
    this.authForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })

    this.route.params.subscribe((params) => {
      this.authType = params['authType'];
    });
  }

  ngOnInit(): void {
  }

  public navigateRegister() {
    this.router.navigate(['auth', 'register']).then();
  }

  public register(): void {
    this.authService.register(this.authForm.value).subscribe((user: User)=> {
      this.router.navigate(['auth', 'login']).then();
    })
  }

  public login():void {
    this.authService.login(this.authForm.value).subscribe(()=> {
      this.router.navigate(['']).then();
    })
  }
}
