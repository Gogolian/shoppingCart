import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from './recipe.service'
import { Recipe } from '../models/recipe.model'

import { exhaustMap, map, take, tap } from "rxjs/operators";
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private userService: UserService
    ) {  }

    storeRecipes(){
      this.http.put('https://shoppingcart-3574a.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()).subscribe((res)=>{
        console.log(res)
      });
    }

    fetchRecipes(){
      return this.userService.user.pipe(
        take(1),
        exhaustMap( user =>
          this.http.get<Recipe[]>('https://shoppingcart-3574a.firebaseio.com/recipes.json',
          {
            params: new HttpParams().set('auth', user.token)
          })
        ),
        map(recipes => {
          return recipes.map(r => {
            return {...r, ingredients: r.ingredients ? r.ingredients : []}
          })
        }),
        tap((res)=>{
          console.log(res);
          this.recipeService.replaceRecipes(res);
        })
      )
    }

}
