import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthInterceptorService } from './services/auth-interceptor.service'
import { AuthModule } from './components/auth/auth.module'
import { StoreModule } from '@ngrx/store'
import { SharedModule } from './shared.module'
import { appReducer } from './app.reducer'

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
    SharedModule,
    StoreModule.forRoot(appReducer)
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
