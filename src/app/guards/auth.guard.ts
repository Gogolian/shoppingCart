import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { map, take } from 'rxjs/operators'
import { User } from '../models/user.model'
import { UserService } from '../services/user.service'
import * as fromApp from '../app.reducer'
import { Store } from '@ngrx/store'
import * as AuthActions from '../components/auth/store/auth.actions'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<true | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        return !!authState.user ? true : this.router.createUrlTree(['/auth'])
      })
      // tap( isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth'])
      //   }
      // })
    )
  }
}
