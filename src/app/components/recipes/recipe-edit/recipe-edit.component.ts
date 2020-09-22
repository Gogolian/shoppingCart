import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model'
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: [`
  input.ng-invalid.ng-touched,
  textarea.ng-invalid.ng-touched{
    border: 1px solid red;
  }`],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isInEditMode: boolean;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isInEditMode = params['id'] !== undefined;

      this.initForm();
    });
  }

  private initForm() {

    let recipe = this.isInEditMode ? this.recipeService.getRecipe(this.id) : new Recipe('', '', '', []);

    this.recipeForm = new FormGroup({
      name: new FormControl(recipe.name, Validators.required),
      imageUrl: new FormControl(recipe.imagePath, Validators.required),
      description: new FormControl(recipe.description, Validators.required),
      ingredients: new FormArray(
        recipe.ingredients.map(
          (ingredient) =>
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.ammount, [Validators.min(1), Validators.required]),
            })
        )
      ),
    });

    console.log(this.recipeForm);
  }

  addNewIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.min(1), Validators.required]),
      })
    );
  }

  deleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


  onSubmit() {
    const recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imageUrl'],
      this.recipeForm.value['ingredients'].map((ingredient)=>{
        return new Ingredient(ingredient.name, +ingredient.amount)
      }),
    )

    this.isInEditMode ? this.recipeService.updateRecipe(recipe, this.id) :
        this.recipeService.addNewRecipe(recipe)

    this.onCancel()
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

}
