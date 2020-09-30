import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { Ingredient } from 'src/app/models/ingredient.model'
import * as fromApp from '../../../app.reducer'
import * as ShoppingListActions from '../store/shopping-list.actions'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editIndex: number = -1
  editItem: Ingredient
  editSub: Subscription

  newShoppingListItemForm: FormGroup

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.newShoppingListItemForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
    })

    this.editSub = this.store.select('shoppingList').subscribe((state) => {
      console.log(state)

      this.editIndex = state.editedingredientIndex
      this.editItem = state.editedingredient

      console.log(this.editIndex, this.editItem)

      this.editItem &&
        this.newShoppingListItemForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.ammount,
        })
    })

    // this.startedEditingSubscription = this.slService.startedEditing.subscribe((index) => {
    //   this.editIndex = index
    //   this.editItem = this.slService.getIngredient(index)

    //   this.newShoppingListItemForm.setValue({'name': this.editItem.name, 'amount': this.editItem.ammount})
    // })
  }

  ngOnDestroy() {
    this.editSub.unsubscribe()
    this.onCancelClick()
  }

  onAddClick() {
    this.store.dispatch(
      new ShoppingListActions.AddIngredient(
        new Ingredient(
          this.newShoppingListItemForm.value['name'],
          this.newShoppingListItemForm.value['amount']
        )
      )
    )
    this.onCancelClick()
  }

  onUpdateClick() {
    this.store.dispatch(
      new ShoppingListActions.UpdateIngredient(
        new Ingredient(
          this.newShoppingListItemForm.value['name'],
          this.newShoppingListItemForm.value['amount']
        )
      )
    )
    this.onCancelClick()
  }

  onCancelClick() {
    this.newShoppingListItemForm.reset()
    this.editIndex = -1
    this.store.dispatch(new ShoppingListActions.StopEditIngredient())
  }
}
