import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

  onAddToShoppingList(){
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

}
