import { Store } from '@ngrx/store'
import { Recipe } from 'src/app/models/recipe.model'
import * as RecipesActions from './recipe.actions'

export interface State {
  recipes: Recipe[]
}

const initialState: State = {
  recipes: [],
}

export function recipeReducer(
  state: State,
  action: RecipesActions.RecipesActions
): State {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      }

    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      }

    case RecipesActions.UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe, index) =>
          action.payload.index === index ? action.payload.recipe : recipe
        ),
      }

    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe, index) => index !== action.payload
        ),
      }

    default:
      return state
  }
}
