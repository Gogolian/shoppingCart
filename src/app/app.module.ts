import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthInterceptorService } from './services/auth-interceptor.service'
import { AuthModule } from './components/auth/auth.module'
import { shoppingListReducer } from './components/shopping-list/store/shopping-list.reducer'
import { StoreModule } from '@ngrx/store'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    CommonModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
