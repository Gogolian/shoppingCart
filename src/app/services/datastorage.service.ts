import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { RecipeService } from './recipe.service'
import { Recipe } from '../models/recipe.model'

import { exhaustMap, map, take, tap } from "rxjs/operators"
import { UserService } from './user.service'

import * as fromApp from '../app.reducer';
import { Store } from '@ngrx/store'
import * as RecipesActions from '../components/recipes/store/recipe.actions'

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
    ) {  }

    storeRecipes(){
      this.http.put('https://shoppingcart-3574a.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()).subscribe((res)=>{
        console.log(res)
      })
    }

    fetchRecipes(){
      return this.store.select('auth').pipe(
        take(1),
        map(authState => authState.user),
        exhaustMap( user =>
          this.http.get<Recipe[]>('https://shoppingcart-3574a.firebaseio.com/recipes.json')
        ),
        map(recipes => {
          return recipes.map(r => {
            return {...r, ingredients: r.ingredients ? r.ingredients : []}
          })
        }),
        tap((res)=>{
          //this.recipeService.replaceRecipes(res)
          this.store.dispatch( new RecipesActions.SetRecipes(res) )
        })
      )
    }

}
