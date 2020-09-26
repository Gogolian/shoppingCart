import { Ingredient } from 'src/app/models/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import { Store } from '@ngrx/store';

const initialState = {
   ingredients: [
       new Ingredient('Tomato', 5),
       new Ingredient('Apple', 50),
   ]
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    action.payload
                ]
            }
    
        default:
            return state;
    }
}