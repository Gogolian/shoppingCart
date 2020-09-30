import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators'
import { Recipe } from 'src/app/models/recipe.model'
import * as RecipesActions from '../store/recipe.actions'
import * as fromApp from '../../../app.reducer'

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.action$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() =>
      this.http.get<Recipe[]>(
        'https://shoppingcart-3574a.firebaseio.com/recipes.json'
      )
    ),
    map((recipes) =>
      recipes.map((r) => ({
        ...r,
        ingredients: r.ingredients ? r.ingredients : [],
      }))
    ),
    map((recipes) => new RecipesActions.SetRecipes(recipes))
  )

  @Effect({ dispatch: false })
  storeRecipes = this.action$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) =>
      this.http.put(
        'https://shoppingcart-3574a.firebaseio.com/recipes.json',
        recipesState.recipes
      )
    )
  )

  constructor(
    private action$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
