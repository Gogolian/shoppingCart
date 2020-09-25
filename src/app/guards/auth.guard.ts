import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, take } from 'rxjs/operators'
import { User } from '../models/user.model'
import { UserService } from '../services/user.service'

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.user.pipe(
      take(1),
      map( user => {
        return !!user ? true : this.router.createUrlTree(['/auth'])
      }),
      // tap( isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth'])
      //   }
      // })
    )
  }
}
