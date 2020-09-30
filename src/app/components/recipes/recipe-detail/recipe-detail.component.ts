import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Recipe } from 'src/app/models/recipe.model'
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'
import * as fromApp from '../../../app.reducer'
import { map, switchMap } from 'rxjs/operators'
import * as RecipesActions from '../store/recipe.actions'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: [],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  recipeIndex: number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.recipeIndex = +params['id']
          return this.store.select('recipes')
        }),
        map((recipesState) =>
          recipesState.recipes.find(
            (recipe, index) => index === this.recipeIndex
          )
        )
      )
      .subscribe((recipe: Recipe) => (this.recipe = recipe))

    // Alternative way

    // this.route.params.subscribe((params: Params) => {
    //   this.recipeIndex = +params['id']
    //   this.recipe = this.recipeService.getRecipe(+params['id'])
    //       this.store
    //       .select('recipes')
    //       .pipe(
    //         map( recipesState => {
    //           return recipesState.recipes.find((recipe, index) => {
    //             return index === this.recipeIndex
    //           })
    //         })
    //       ).subscribe((recipe: Recipe) => this.recipe = recipe)
    // })
  }

  addIngredientsToShoppingList() {
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    )
    this.router.navigate(['shopping-list'])
  }

  deleteRecipe() {
    //this.recipeService.deleteRecipe(this.recipeIndex)
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipeIndex))
    this.router.navigate(['/recipes'])
  }
}
