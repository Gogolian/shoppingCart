import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from 'src/app/guards/auth.guard'
import { RecipesResolverService } from 'src/app/services/recipes-resolver.service'
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component'
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component'
import { RecipeStartComponent } from './recipe-start/recipe-start.component'
import { RecipesComponent } from './recipes.component'

const routes: Routes = [
  { path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
  ] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class RecipesRoutingModule { }
