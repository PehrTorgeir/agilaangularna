import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SportExistsGuard implements CanActivate {

  // List of valid sports
  private validSports = ['fotboll', 'ishockey', 'innebandy'];

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("Guard is being checked!");

    const sportName = route.params['sport'];
    console.log(`Sport Name: ${sportName}`);

    if (this.validSports.includes(sportName)) {
      console.log("Sport exists. Navigation allowed.");
      return true;
    }

    console.log("Sport does not exist. Navigating to error.");
    this.router.navigate(['/error404']);
    return false;
  }

}
