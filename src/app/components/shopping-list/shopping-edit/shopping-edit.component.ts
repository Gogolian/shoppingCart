import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: []
})
export class ShoppingEditComponent implements OnInit {
  newShoppingListItemForm: FormGroup

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.newShoppingListItemForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.min(1)]),
    })
  }

  onAddItem(){
    this.slService.addIngredients([new Ingredient(
      this.newShoppingListItemForm.value['name'],
      this.newShoppingListItemForm.value['amount']
    )])
  }

}
