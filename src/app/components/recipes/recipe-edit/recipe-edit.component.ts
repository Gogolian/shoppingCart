import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
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
  id: number = -1;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      this.initForm();
    });
  }

  private initForm() {
    let iRec = new Recipe('', '', '', []);

    //if (this.id && this.id !== -1) {
      iRec = this.recipeService.getRecipe(this.id) || iRec;
    //}

    this.recipeForm = new FormGroup({
      name: new FormControl(iRec.name, Validators.required),
      imageUrl: new FormControl(iRec.imagePath, Validators.required),
      description: new FormControl(iRec.description, Validators.required),
      ingredients: new FormArray(
        iRec.ingredients.map(
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
    let recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imageUrl'],
      this.recipeForm.value['ingredients'],
    )

    if (this.id && this.id !== -1) {
      //update
      this.recipeService.updateRecipe(recipe, this.id)

    }else{
      //addNew
        this.recipeService.addNewRecipe(recipe)

      console.log(this.recipeService.getRecipes())
    }
  }

  onCancel(){
    //this.route.``
  }

}
