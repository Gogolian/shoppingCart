import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../../../models/recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output("onRecipeItemClicked") clicker = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A test recipe', 'Tis is test', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Sv6IeuHEruaYYLYqxa0ZtAHaHa%26pid%3DApi&f=1'),
    new Recipe('A test recipe 2 ', 'Tis is test 2', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Sv6IeuHEruaYYLYqxa0ZtAHaHa%26pid%3DApi&f=1'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeItemClicked(recipe){
    console.log("recipe from recipe list:", recipe)
   this.clicker.emit(recipe)
  }

}
