import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { exhaustMap, map, take } from 'rxjs/operators'
import { UserService } from './user.service'
import * as fromApp from '../app.reducer'
import { Store } from '@ngrx/store'
import * as AuthActions from '../components/auth/store/auth.actions'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => authState.user),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req)
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        })
        return next.handle(modifiedReq)
      })
    )
  }
}
