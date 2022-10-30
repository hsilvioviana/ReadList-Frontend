import { Component } from '@angular/core';
import { ISignupForm } from './interfaces/ISignupForm';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterPaths } from 'src/app/shared/RouterPaths';
import { msg } from 'src/app/shared/utils/msg';
import { Helpers } from 'src/app/shared/utils/helpers';
import { SignupService } from './services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  router: RouterPaths
  helpers = Helpers;
  msg = msg;
  
  constructor(private fb: FormBuilder, private service: SignupService, router: RouterPaths) { 
    this.router = router
  }

  signupForm: FormGroup = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
  })

  signup(): void {
    let payload: ISignupForm = this.signupForm.value

    this.service.signup(payload)
      .subscribe(data => {
        localStorage.setItem('username', data.username)
        localStorage.setItem('email', data.email)
        localStorage.setItem('token', data.token)
        this.router.goToHome()
      },
      error => window.alert(error?.error?.message))
  }
}
