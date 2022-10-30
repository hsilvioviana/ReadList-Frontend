import { Component } from '@angular/core';
import { ILoginForm } from './interfaces/ILoginForm';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterPaths } from 'src/app/shared/RouterPaths';
import { Helpers } from 'src/app/shared/utils/helpers';
import { msg } from 'src/app/shared/utils/msg';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  router: RouterPaths
  helpers = Helpers;
  msg = msg;
  
  constructor(private fb: FormBuilder, private loginService: LoginService, router: RouterPaths) { 
    this.router = router
  }

  loginForm: FormGroup = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
  })

  login(): void {
    let payload: ILoginForm = this.loginForm.value

    this.loginService.login(payload)
      .subscribe(data => {
        localStorage.setItem('username', data.username)
        localStorage.setItem('email', data.email)
        localStorage.setItem('token', data.token)
        this.router.goToHome()
      },
      error => window.alert(error?.error?.message))
  }
}
