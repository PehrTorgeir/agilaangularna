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
    const sportName = route.params['sport'];

    if (this.validSports.includes(sportName)) {
      return true;
    }

    this.router.navigate(['/error404']);
    return false;
  }
}
