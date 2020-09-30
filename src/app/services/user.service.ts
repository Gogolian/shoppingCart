import { Injectable } from '@angular/core'
import * as fromApp from '../app.reducer'
import { Store } from '@ngrx/store'
import * as AuthActions from '../components/auth/store/auth.actions'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userExpiryTimer

  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer(expiry: number): void {
    this.userExpiryTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout())
    }, expiry)
  }

  clearLogoutTimer(): void {
    if (this.userExpiryTimer){
      clearTimeout(this.userExpiryTimer)
    }
  }
}
