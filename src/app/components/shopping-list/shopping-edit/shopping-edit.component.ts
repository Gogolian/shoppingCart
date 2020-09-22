import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editIndex: number = -1;
  editItem: Ingredient;

  newShoppingListItemForm: FormGroup;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.newShoppingListItemForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
    });

    this.slService.startedEditing.subscribe((index) => {
      this.editIndex = index;
      this.editItem = this.slService.getIngredient(index);

      this.newShoppingListItemForm.setValue({'name': this.editItem.name, 'amount': this.editItem.ammount});
    });
  }

  ngOnDestroy() {
    this.slService.startedEditing.unsubscribe();
  }

  onAddClick() {
    this.slService.addIngredients([
      new Ingredient(
        this.newShoppingListItemForm.value['name'],
        this.newShoppingListItemForm.value['amount']
      ),
    ]);
    this.onCancelClick()
  }

  onUpdateClick() {
    this.slService.updateIngredient(
      new Ingredient(
        this.newShoppingListItemForm.value['name'],
        this.newShoppingListItemForm.value['amount']
      ), this.editIndex
    );
    this.onCancelClick()
  }

  onCancelClick(){
    this.newShoppingListItemForm.reset()
    this.editIndex = -1
  }

  isValid(name: string){
    this.newShoppingListItemForm.get('name').valid
  }
}
