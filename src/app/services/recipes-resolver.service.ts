import { Injectable } from "@angular/core"
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { Store } from '@ngrx/store'

import { Recipe } from "../models/recipe.model"
import { DatastorageService } from "./datastorage.service"
import { RecipeService } from './recipe.service'

import { Actions, ofType } from '@ngrx/effects'

import * as fromApp from '../app.reducer'
import * as RecipeAtions from '../components/recipes/store/recipe.actions'
import { take } from 'rxjs/operators'


@Injectable({ providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.store.dispatch( new RecipeAtions.FetchRecipes())
    return this.actions$.pipe(
      ofType(
        RecipeAtions.SET_RECIPES
      ),
      take(1)
    )

    // const recipes = this.recipeService.getRecipes()
    // //return !recipes.length ? this.dataStore.fetchRecipes() : recipes
    // return recipes
  }
}
