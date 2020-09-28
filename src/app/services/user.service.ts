import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import * as fromApp from '../app.reducer';
import { Store } from '@ngrx/store'
import * as AuthActions from '../components/auth/store/auth.actions'

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userExpiryTimer;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  autoLognn() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('authUser'));

    console.log('user', userData);

    if (!userData) {
      return null;
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

      this.store.dispatch( new AuthActions.AuthenticateSuccess({
        email: loadedUser.email,
        token: loadedUser.token,
        userId: loadedUser.id,
        expirationDate: new Date(userData._tokenExpirationDate)
      }) )

      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expiry: number) {
    this.userExpiryTimer = setTimeout(() => {
      //this.logout();
    }, expiry);
  }
}
