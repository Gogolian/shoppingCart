import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igCgangeSub: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.igCgangeSub = this.slService.ingredientsChanged.subscribe(
      (newShoppingList: Ingredient[]) => {
        this.ingredients = newShoppingList;
      }
    )
  }

  ngOnDestroy(): void{
    this.igCgangeSub.unsubscribe();
  }

}
