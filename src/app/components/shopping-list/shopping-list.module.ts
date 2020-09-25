import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component'
import { ShoppingListComponent } from './shopping-list.component'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild( [{ path: 'shopping-list', component: ShoppingListComponent }] )
  ],
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  providers: [],
})
export class ShoppingListModule { }
