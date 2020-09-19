import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() goToRecipes = new EventEmitter<any>();
  @Output() goToShoppingList = new EventEmitter<any>();

  collapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  onRecipesClicked(){
    this.goToRecipes.emit();
  }

  onToShoppingListClicked(){
    this.goToShoppingList.emit();
  }

}
