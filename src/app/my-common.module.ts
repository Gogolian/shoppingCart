import { NgModule } from '@angular/core';
import { DropdownDirective } from './directives/dropdown.directive';
import { PlaceholderDirective } from './directives/placeholder.directive';


@NgModule({
  declarations: [
    DropdownDirective,
    PlaceholderDirective
  ],
  exports: [
    DropdownDirective,
    PlaceholderDirective
  ],
  providers: [],
})
export class MyCommonModule { }
