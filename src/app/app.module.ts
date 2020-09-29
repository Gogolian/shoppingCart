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
import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from './components/auth/store/auth.effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { environment } from 'src/environments/environment'


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
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
