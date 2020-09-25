import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Ingredient } from '../models/ingredient.model'

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()

  shoppingList: Ingredient[] = [
    new Ingredient('Banana', 6),
    new Ingredient('Peach', 16),
    new Ingredient('Rye', 4),
  ]

  getIngredients(){
    return this.shoppingList.slice()
  }

  getIngredient(index){
    return this.shoppingList[index]
  }

  constructor() { }

  addIngredients(ingredients: Ingredient[]){
    this.shoppingList.push(...ingredients)
    this.emitIngredientsChanged()
  }

  updateIngredient(ingredient: Ingredient, index: number){
    this.shoppingList[index] = ingredient
    this.emitIngredientsChanged()
  }

  removeIngredient(index: number){
    this.shoppingList = this.shoppingList.filter((ing, i) => {
      return i !== index && ing
    } )
    this.emitIngredientsChanged()
  }

  private emitIngredientsChanged(){
    this.ingredientsChanged.next(this.shoppingList.slice())
  }


}
