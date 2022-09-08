import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterPaths {

  constructor(private router: Router) { }

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
}
