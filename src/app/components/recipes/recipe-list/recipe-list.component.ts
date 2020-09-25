import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { RecipeService } from 'src/app/services/recipe.service'
import { Recipe } from '../../../models/recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: []
})
export class RecipeListComponent implements OnInit {
  @Output("onRecipeItemClicked") clicker = new EventEmitter<Recipe>()
  recipes: Recipe[] = []

  constructor(private recipeService: RecipeService ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()

    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
      this.recipes = recipes
    })
  }

  onRecipeItemClicked(recipe){
    console.log("recipe from recipe list:", recipe)
   this.clicker.emit(recipe)
  }

}
