import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Ingredient } from 'src/app/models/ingredient.model'
import { ShoppingListService } from 'src/app/services/shopping-list.service'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [`
  .btn {
    margin-left: 6px
  }`]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]
  private subscription: Subscription

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients()
    this.subscription = this.slService.ingredientsChanged.subscribe(
      (newShoppingList: Ingredient[]) => {
        this.ingredients = newShoppingList
      }
    )
  }

  ngOnDestroy(): void{
    !!this.subscription && this.subscription.unsubscribe()
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index)
  }

  onDeleteItem(index: number){
    if(confirm('Are you sure?')){
      this.slService.removeIngredient(index)
    }else{
      return
    }
  }

}
