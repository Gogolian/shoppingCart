import { Injectable } from '@angular/core'
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { Store } from '@ngrx/store'

import { Recipe } from '../models/recipe.model'
import { Actions, ofType } from '@ngrx/effects'

import * as fromApp from '../app.reducer'
import * as RecipeAtions from '../components/recipes/store/recipe.actions'
import { map, switchMap, take } from 'rxjs/operators'
import { Observable, of } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState) => recipesState.recipes),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeAtions.FetchRecipes())
          return this.actions$.pipe(ofType(RecipeAtions.SET_RECIPES), take(1))
        }
        return of(recipes)
      })
    )

    // const recipes = this.recipeService.getRecipes()
    // //return !recipes.length ? this.dataStore.fetchRecipes() : recipes
    // return recipes
  }
}
