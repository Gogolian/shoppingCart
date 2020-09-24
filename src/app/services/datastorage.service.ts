import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service'
import { Recipe } from '../models/recipe.model'

import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {

  constructor(private http: HttpClient,
    private recipeService: RecipeService
    ) {  }

    storeRecipes(){
      this.http.put('https://shoppingcart-3574a.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()).subscribe((res)=>{
        console.log(res)
      });
    }

    fetchRecipes(){
      return this.http.get<Recipe[]>('https://shoppingcart-3574a.firebaseio.com/recipes.json')
      .pipe(
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
