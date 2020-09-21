import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../../../models/recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output("onRecipeItemClicked") clicker = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeItemClicked(recipe){
    console.log("recipe from recipe list:", recipe)
   this.clicker.emit(recipe)
  }

}
