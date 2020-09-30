import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { Subscription } from 'rxjs'
import * as fromApp from '../../app.reducer'
import { Store } from '@ngrx/store'
import * as AuthActions from '../../components/auth/store/auth.actions'
import * as RecipesActions from '../recipes/store/recipe.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true
  isAuthenticated = false
  private userSubscription: Subscription

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').subscribe((authState) => {
      this.isAuthenticated = !!authState.user
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }

  saveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes())
  }

  fetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes())
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout())
  }
}
