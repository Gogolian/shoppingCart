import { NgModule } from '@angular/core'
import { ClickOutsideDirective } from './directives/clickoutside.directive'
import { DropdownDirective } from './directives/dropdown.directive'
import { PlaceholderDirective } from './directives/placeholder.directive'

@NgModule({
  declarations: [DropdownDirective, PlaceholderDirective, ClickOutsideDirective],
  exports: [DropdownDirective, PlaceholderDirective, ClickOutsideDirective],
  providers: [],
})
export class SharedModule {}
