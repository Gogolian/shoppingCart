import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Recipe } from 'src/app/models/recipe.model'
import { RecipeService } from 'src/app/services/recipe.service'

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = +params['id']
      this.recipe = this.recipeService.getRecipe(+params['id'])
    })
  }

  addIngredientsToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
    this.router.navigate(['shopping-list'])
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.recipeIndex)
    this.router.navigate(['/recipes'])
  }
}
