import { Store } from '@ngrx/store'
import { Recipe } from 'src/app/models/recipe.model'
import * as RecipeActions from './recipe.actions'

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: []
}

export function recipeReducer(state: State, action: RecipeActions.RecipesActions) {
    switch( action.type ){
        case '[Recipes] Set Recipes':
            return {
                ...state,
                recipes: [...action.payload]
            }
        default:
            return state
    }
}