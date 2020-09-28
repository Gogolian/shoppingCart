import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { UserService } from './services/user.service'
import * as AuthActions from './components/auth/store/auth.actions'
import * as fromApp from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent implements OnInit{
  title = 'shoppingCart'

  constructor( private store: Store<fromApp.AppState> ){}

  ngOnInit() {
    this.store.dispatch( new AuthActions.AutoLogin() )
  }
}
