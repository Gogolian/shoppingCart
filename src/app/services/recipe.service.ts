import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Big Burger',
    'This is a recipe for a really large burger',
    'https://i.ytimg.com/vi/a19EY3YNStA/maxresdefault.jpg',
    [
      new Ingredient('Bun', 20),
      new Ingredient('Meat', 10),
    ]),
    new Recipe('Onion Burger',
    'Do you like onions? In that case...',
    'https://i.ytimg.com/vi/C5Hq4mjMJQM/maxresdefault.jpg',
    [
      new Ingredient('Bun', 1),
      new Ingredient('Tomato', 2),
      new Ingredient('Meat', 4),
      new Ingredient('Onion', 40),
    ]),
  ]

  constructor(private slService :ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }


  addNewRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.emitRecipesChanged()
  }

  updateRecipe(recipe: Recipe, index:number){
    this.recipes[index] = recipe;
    this.emitRecipesChanged()
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1)
    this.emitRecipesChanged()
  }

  private emitRecipesChanged(){
    this.recipesChanged.next(this.recipes.slice());
  }
}
