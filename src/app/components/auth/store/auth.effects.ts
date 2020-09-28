import { HttpClient } from '@angular/common/http'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import * as AuthActions from '../../../components/auth/store/auth.actions'
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs'
import { Injectable } from '@angular/core'

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap( (authData: AuthActions.LoginStart) => {
      return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        { email: authData.payload.email, password: authData.payload.password, returnSecureToken: true }
      )
      .pipe(
        map((resData) =>{
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          return of( new AuthActions.Login({
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken,
            expirationDate
          }))
        }),
        catchError( error  => {
          //...
          return of()
        }),
      );
    })
  )
  constructor( private actions$: Actions,
    private http: HttpClient, ) {}
}
