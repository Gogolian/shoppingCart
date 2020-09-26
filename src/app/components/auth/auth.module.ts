import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service'
import { AlertComponent } from '../alert/alert.component'
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component'
import { AuthComponent } from './auth.component'
import { MyCommonModule } from '../../my-common.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild( [{ path: 'auth', component: AuthComponent }] ),
    MyCommonModule
  ],
  declarations: [
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
})
export class AuthModule { }
