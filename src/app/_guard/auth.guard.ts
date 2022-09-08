import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const path = route.routeConfig?.path

        const isTryingToAccessPathsMadeForUnauthenticatedUsersOnly = (path == "signup" || path == "login")

        const isAuthenticated = localStorage.getItem('token')

        if (isAuthenticated && isTryingToAccessPathsMadeForUnauthenticatedUsersOnly)
        {
            this.router.navigate(['/'])
            return true
        }
        else if (isAuthenticated && !isTryingToAccessPathsMadeForUnauthenticatedUsersOnly) {
            return true
        }
        else if (!isAuthenticated && isTryingToAccessPathsMadeForUnauthenticatedUsersOnly) {
            return true
        }
        else {
            this.router.navigate(['/login'])
            return false
        }
    }
}
