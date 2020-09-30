import { Ingredient } from 'src/app/models/ingredient.model'
import * as ShoppingListActions from './shopping-list.actions'

export interface State {
  ingredients: Ingredient[]
  editedingredient: Ingredient
  editedingredientIndex: number
}

const initialState: State = {
  ingredients: [new Ingredient('Tomato', 5), new Ingredient('Apple', 50)],
  editedingredient: null,
  editedingredientIndex: -1,
}

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      }

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      }

    case ShoppingListActions.UPDATE_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients.map((ingredient, index) => {
            if (state.editedingredientIndex === index) return action.payload
            return ingredient
          }),
        ],
        editedingredientIndex: -1,
        editedingredient: null,
      }

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients.filter((ingredient, index) => {
            return index !== action.payload
          }),
        ],
      }

    case ShoppingListActions.START_EDIT_INGREDIENT:
      return {
        ...state,
        editedingredient: { ...state.ingredients[action.payload] },
        editedingredientIndex: action.payload,
      }

    case ShoppingListActions.STOP_EDIT_INGREDIENT:
      return {
        ...state,
        editedingredient: null,
        editedingredientIndex: -1,
      }

    default:
      return state
  }
}
