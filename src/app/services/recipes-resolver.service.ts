import { Injectable } from "@angular/core"
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"

import { Recipe } from "../models/recipe.model"
import { DatastorageService } from "./datastorage.service"
import { RecipeService } from './recipe.service'

@Injectable({ providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor( private dataStore: DatastorageService,
    private recipeService: RecipeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes()
    //return !recipes.length ? this.dataStore.fetchRecipes() : recipes
    return recipes
  }
}
