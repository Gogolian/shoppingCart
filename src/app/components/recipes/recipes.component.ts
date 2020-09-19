import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipe:Recipe;

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeItemClicked(rec){
    console.log("recipe")
    console.log(rec)
    this.recipe = rec;
  }

}
