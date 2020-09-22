import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
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
    ingredients.forEach( ing => this.shoppingList.push(ing) )
    this.ingredientsChanged.emit(this.shoppingList.slice());
  }


}
