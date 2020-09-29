import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { Recipe } from '../../../models/recipe.model'
import * as fromApp from '../../../app.reducer'
import { map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: []
})
export class RecipeListComponent implements OnInit {
  @Output("onRecipeItemClicked") clicker = new EventEmitter<Recipe>()
  recipes: Recipe[] = []
  subscription: Subscription

  constructor(
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.store.select('recipes')
    .subscribe( recipesState => recipesState && (this.recipes = recipesState.recipes) )

    
    // // Alternative solution

    // this.store.select('recipes')
    // .pipe( map( recpieState => recpieState.recipes) )
    // .subscribe( recipes => this.recipes = recipes )

  }

  onRecipeItemClicked(recipe){
    console.log("recipe from recipe list:", recipe)
   this.clicker.emit(recipe)
  }

}
