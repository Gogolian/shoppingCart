import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from '../../../components/auth/store/auth.actions';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
    ofType(AuthActions.AUTHENTICATE_START),
    switchMap((authData: AuthActions.AuthenticateStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData) => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate,
            });
          }),
          catchError((errorResponse) => {
            let errorMessage = 'An unknown error occured!';

            if (!errorResponse.error || !errorResponse.error.error) {
              return of( new AuthActions.AuthenticateFail(errorMessage) );
            }

            switch (errorResponse.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = 'This email is already taken';
                break;
              case 'EMAIL_NOT_FOUND':
                errorMessage = 'User not found. Please sign-up first';
                break;
              case 'INVALID_PASSWORD':
                errorMessage = 'Incorrect Password';
                break;
              default:
                errorMessage = 'An unknown error occured!';
            }
            return of( new AuthActions.AuthenticateFail(errorMessage) );
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP),
    tap(()=>{

    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
