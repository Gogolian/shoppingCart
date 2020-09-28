import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Recipe } from 'src/app/models/recipe.model'
import { RecipeService } from 'src/app/services/recipe.service'
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducer'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: []
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  recipeIndex: number

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = +params['id']
      this.recipe = this.recipeService.getRecipe(+params['id'])
    })
  }

  addIngredientsToShoppingList() {
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
    this.store.dispatch( new ShoppingListActions.AddIngredients(this.recipe.ingredients) )
    this.router.navigate(['shopping-list'])
  }

  deleteRecipe(){
    //this.recipeService.deleteRecipe(this.recipeIndex)
    this.store.dispatch( new ShoppingListActions.DeleteIngredient(this.recipeIndex) )
    this.router.navigate(['/recipes'])
  }
}
