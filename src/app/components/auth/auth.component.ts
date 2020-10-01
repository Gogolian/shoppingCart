import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'
import { PlaceholderDirective } from 'src/app/directives/placeholder.directive'
import { AlertComponent } from '../alert/alert.component'
import * as fromApp from '../../app.reducer'
import { Store } from '@ngrx/store'
import * as AuthActions from '../../components/auth/store/auth.actions'

enum Mode {
  SIGNUP = 0,
  LOGIN = 1,
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [],
})
export class AuthComponent implements OnInit, OnDestroy {
  mode = Mode.LOGIN
  isLoading = false
  error = null

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective

  private closeSub: Subscription
  private storeSub: Subscription

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading
      this.error = authState.authError
      if (this.error) {
        this.showErrorAlert(this.error)
      }
    })
  }

  switchMode(): void {
    this.mode = this.mode === Mode.SIGNUP ? Mode.LOGIN : Mode.SIGNUP

    this.onHandleError()
  }

  onSubmit(form: NgForm): void {
    this.onHandleError()

    this.mode === Mode.SIGNUP
      ? this.store.dispatch(
          new AuthActions.Signup({
            email: form.value.email,
            password: form.value.password,
          })
        )
      : this.store.dispatch(
          new AuthActions.AuthenticateStart({
            email: form.value.email,
            password: form.value.password,
          })
        )

    form.reset()
  }

  onHandleError(): void {
    this.store.dispatch(new AuthActions.ResetError())
  }

  ngOnDestroy(): void {
    this.closeSub && this.closeSub.unsubscribe()
    this.storeSub && this.storeSub.unsubscribe()
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    )
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)

    componentRef.instance.message = message
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe()
      hostViewContainerRef.clear()
    })
  }
}
