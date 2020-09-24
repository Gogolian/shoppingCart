import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service'
import { Recipe } from '../models/recipe.model'

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
      this.http.get<Recipe[]>('https://shoppingcart-3574a.firebaseio.com/recipes.json').subscribe((res)=>{
        console.log(res);
        this.recipeService.replaceRecipes(res);
      })
    }
}
