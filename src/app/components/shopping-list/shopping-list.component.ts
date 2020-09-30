import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Ingredient } from 'src/app/models/ingredient.model'
import { Store } from '@ngrx/store'
import * as ShoppingListActions from './store/shopping-list.actions'
import * as fromApp from '../../app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [
    `
      .btn {
        margin-left: 6px;
      }
    `,
  ],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
  }

  ngOnDestroy(): void {}

  onEditItem(index: number): void {
    this.store.dispatch(new ShoppingListActions.StartEditIngredient(index))
    // this.slService.startedEditing.next(index)
  }

  onDeleteItem(index: number): void {
    if (confirm('Are you sure?')) {
      this.store.dispatch(new ShoppingListActions.DeleteIngredient(index))
    } else {
      //
    }
  }
}
