import { Component, Input, OnInit } from '@angular/core'
import { Recipe } from 'src/app/models/recipe.model'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styles: [`
  .margin-for-image{
    width: calc(100% - 120px);
  }
  `],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe
  @Input() index: number

  constructor() {}

  ngOnInit(): void {}
}
