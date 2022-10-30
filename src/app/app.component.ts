import { Component } from '@angular/core';
import { RouterPaths } from './shared/RouterPaths';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  router: RouterPaths
  
  constructor(router: RouterPaths) { 
    this.router = router
  }

  showMenu() : boolean
  {
    const currentRoute = this.router.currentRoute()

    return (currentRoute != "/login" && currentRoute != "/signup")
  }

  goToHome()
  {
    this.router.goToHome()
  }

  goToStatistics()
  {
    this.router.goToStatistics()
  }

  goToConfigs()
  {
    this.router.goToConfigs()
  }

  logout()
  {
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    this.router.goToLogout()
  }
}
