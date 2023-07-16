import { Component } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin!: FormGroup;
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // if (this.authSrv.isLogged()) {
    //   this.router.navigate(['/dashboard']).then(r => r);
    // }

    this.buildForm();
  }

  buildForm() {
    this.formLogin = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

}
