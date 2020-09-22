import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  shoppingList: Ingredient[] = [
    new Ingredient('Banana', 6),
    new Ingredient('Peach', 16),
    new Ingredient('Rye', 4),
  ]

  getIngredients(){
    return this.shoppingList.slice();
  }

  constructor() { }

  addIngredients(ingredients: Ingredient[]){
    this.shoppingList.push(...ingredients)
    this.ingredientsChanged.next(this.shoppingList.slice());
  }


}
