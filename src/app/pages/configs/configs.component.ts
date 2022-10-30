import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterPaths } from 'src/app/shared/RouterPaths';
import { Helpers } from 'src/app/shared/utils/helpers';
import { msg } from 'src/app/shared/utils/msg';
import { IUpdateUserForm } from './interfaces/IUpdateUserForm';
import { ConfigsService } from './services/configs.service';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.scss']
})
export class ConfigsComponent implements OnInit {

  router: RouterPaths
  helpers = Helpers
  msg = msg

  constructor(private fb: FormBuilder, private configsService: ConfigsService, router: RouterPaths) { 
    this.router = router
  }

  ngOnInit(): void {
    this.configsForm.controls["username"].patchValue(localStorage.getItem('username'))
    this.configsForm.controls["email"].patchValue(localStorage.getItem('email'))
  }

  configsForm: FormGroup = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.minLength(6), Validators.maxLength(30)]],
    newPassword: ["", [Validators.minLength(6), Validators.maxLength(30)]]
  })

  updateUser(): void {
    let payload: IUpdateUserForm = this.configsForm.value

    this.configsService.updateUser(payload)
      .subscribe(data => {
        localStorage.setItem('username', data.username)
        localStorage.setItem('email', data.email)
        localStorage.setItem('token', data.token)
        this.router.goToHome()
      },
      error => window.alert(error?.error?.message))
  }
}
