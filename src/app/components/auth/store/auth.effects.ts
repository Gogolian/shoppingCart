import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from '../../../components/auth/store/auth.actions';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service'

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

const handleAuthentication = (
  email: string,
  userId: string,
  token: string,
  expiresIn: number
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

  localStorage.setItem(
    'authUser',
    JSON.stringify(new User(email, userId, token, expirationDate))
  );

  return new AuthActions.AuthenticateSuccess({
    email,
    token,
    userId,
    expirationDate,
  });
};

const handleError = (errorResponse: {
  error: { error: { message: string } };
}) => {
  let errorMessage = 'An unknown error occured!';

  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
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
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('authUser'));

      if (!userData) {
        return { type: 'DUMY' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();

       this.userService.setLogoutTimer(expirationDuration)

        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          token: loadedUser.token,
          userId: loadedUser.id,
          expirationDate: new Date(userData._tokenExpirationDate),
        });
      }

      return { type: 'DUMY' };
    })
  );

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
          tap(({expiresIn}) => this.userService.setLogoutTimer(+expiresIn * 1000) ),
          map(({ email, idToken, expiresIn, localId }) =>
            handleAuthentication(email, localId, idToken, +expiresIn)
          ),
          catchError((errorResponse) => handleError(errorResponse))
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP),
    switchMap((signupAction: AuthActions.Signup) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.firebaseAPIKey,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap(({expiresIn}) => this.userService.setLogoutTimer(+expiresIn * 1000) ),
          map(({ email, idToken, expiresIn, localId }) =>
            handleAuthentication(email, localId, idToken, +expiresIn)
          ),
          catchError((errorResponse) => handleError(errorResponse))
        );
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.userService.clearLogoutTimer()
      localStorage.removeItem('authUser')
      this.router.navigate(['/auth'])
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}
}
