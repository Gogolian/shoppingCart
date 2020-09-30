import * as fromShoppingList from './components/shopping-list/store/shopping-list.reducer'
import * as fromAuth from './components/auth/store/auth.reducer'
import * as fromRecipes from './components/recipes/store/recipe.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface AppState {
  shoppingList: fromShoppingList.State
  auth: fromAuth.State
  recipes: fromRecipes.State
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer,
}
