import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Ingredient } from 'src/app/models/ingredient.model'
import { Recipe } from 'src/app/models/recipe.model'
import * as fromApp from '../../../app.reducer'
import { Store } from '@ngrx/store'
import { map } from 'rxjs/operators'
import * as RecipesActions from '../store/recipe.actions'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: [`
  input.ng-invalid.ng-touched,
  textarea.ng-invalid.ng-touched{
    border: 1px solid red
  }`],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number
  isInEditMode: boolean
  recipeForm: FormGroup

  private storeSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.isInEditMode = params['id'] !== undefined

      this.initForm()
    })
  }

  private initForm() {
    
    let recipe = new Recipe('', '', '', [])

    this.recipeForm = new FormGroup({
      name: new FormControl(recipe.name, Validators.required),
      imageUrl: new FormControl(recipe.imagePath, Validators.required),
      description: new FormControl(recipe.description, Validators.required),
      ingredients: new FormArray([]),
    })

    if( this.isInEditMode ) {
      this.storeSub = this.store.select('recipes').pipe(
        map(
          recipeState => recipeState.recipes.find(
            (recipe, index) => index === this.id
          )
        )
      )
      .subscribe(
        (recipe: Recipe) => {
          this.recipeForm.setValue({name: recipe.name, imageUrl: recipe.imagePath, description: recipe.description, ingredients: []})
          recipe.ingredients.map(
            ingredient =>
              (<FormArray>this.recipeForm.get('ingredients')).push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.ammount, [Validators.min(1), Validators.required]),
                })
              )
          )
        }
      )
    }
    
  }

  addNewIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.min(1), Validators.required]),
      })
    )
  }

  deleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }


  onSubmit() {
    const recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imageUrl'],
      this.recipeForm.value['ingredients'].map(
        ingredient => new Ingredient(ingredient.name, +ingredient.amount)
      ),
    )


    this.isInEditMode
      ? this.store.dispatch( new RecipesActions.UpdateRecipe({index: this.id, recipe}) )
      : this.store.dispatch( new RecipesActions.AddRecipe(recipe) )

    // this.isInEditMode ? this.recipeService.updateRecipe(recipe, this.id) :
    //     this.recipeService.addNewRecipe(recipe)

    this.onCancel()
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  deleteAllIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).clear()
  }

  ngOnDestroy(){
    this.storeSub && this.storeSub.unsubscribe()
  }

}
