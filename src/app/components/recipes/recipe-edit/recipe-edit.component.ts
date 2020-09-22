import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: [],
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

    if (this.id !== -1) {
      iRec = this.recipeService.getRecipe(this.id);
      console.log('editing recipe: ', iRec);
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(iRec.name, Validators.required),
      imageUrl: new FormControl(iRec.imagePath),
      description: new FormControl(iRec.description),
      ingredients: new FormArray(
        iRec.ingredients.map(
          (ingredient) =>
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.ammount),
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
        amount: new FormControl(null, [Validators.required, Validators.min(1)]),
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
}
