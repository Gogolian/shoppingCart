import { Component, OnInit } from '@angular/core'
import { Recipe } from 'src/app/models/recipe.model'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styles: []
})
export class RecipesComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
