import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component'
import { ShoppingListComponent } from './shopping-list.component'
import { MyCommonModule } from '../../my-common.module'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild( [{ path: 'shopping-list', component: ShoppingListComponent }] ),
    MyCommonModule
  ],
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  providers: [],
})
export class ShoppingListModule { }
