import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterPaths {

  constructor(private router: Router) { }

  currentRoute()
  {
    return this.router.url
  }

  goToLogin()
  {
    this.router.navigate(['/login']);
  }

  goToSignup()
  {
    this.router.navigate(['/signup']);
  }

  goToHome()
  {
    this.router.navigate(['/']);
  }

  goToStatistics()
  {
    this.router.navigate(['/statistics']);
  }

  goToConfigs()
  {
    this.router.navigate(['/configs']);
  }

  goToLogout()
  {
    this.router.navigate(['/login']);
  }

}
