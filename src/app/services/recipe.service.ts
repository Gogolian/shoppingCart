import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subject } from 'rxjs'
import { Ingredient } from '../models/ingredient.model'
import { Recipe } from '../models/recipe.model'
import * as fromShoppingList from '../components/shopping-list/store/shopping-list.reducer'
import * as ShoppingListActions from '../components/shopping-list/store/shopping-list.actions'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>()

  private recipes: Recipe[] = []

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) { }

  getRecipes() {
    return this.recipes.slice()
  }

  getRecipe(index: number){
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.store.dispatch( new ShoppingListActions.AddIngredients(ingredients) )
  }

  addNewRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.emitRecipesChanged()
  }

  updateRecipe(recipe: Recipe, index:number){
    this.recipes[index] = recipe
    this.emitRecipesChanged()
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1)
    this.emitRecipesChanged()
  }

  private emitRecipesChanged(){
    this.recipesChanged.next(this.recipes.slice())
  }

  replaceRecipes(recipes: Recipe[]){
    this.recipes = recipes
    this.emitRecipesChanged()
  }
}
