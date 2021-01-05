import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
