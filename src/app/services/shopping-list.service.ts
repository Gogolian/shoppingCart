import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  shoppingList: Ingredient[]

  constructor() { }

  addIngredients(ingredients: Ingredient[]){
    ingredients.forEach( ing => this.shoppingList.push(ing) )
  }
}
