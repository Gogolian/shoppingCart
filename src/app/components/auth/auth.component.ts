import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PlaceholderDirective } from 'src/app/directives/placeholder.directive';
import { AuthResponseData, UserService } from 'src/app/services/user.service';
import { AlertComponent } from '../alert/alert.component';
import * as fromApp from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../components/auth/store/auth.actions';

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

  constructor(
    private userService: UserService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {

    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading
      this.error = authState.authError
      if(this.error) {
        this.showErrorAlert(this.error)
      }
    })

  }

  switchMode() {
    this.mode = this.mode == Mode.SIGNUP ? Mode.LOGIN : Mode.SIGNUP;
    this.error = null;
  }

  onSubmit(form: NgForm) {
    this.error = null;
    this.isLoading = true;

    let observable: Observable<AuthResponseData>;

    // observable =
    //   this.mode == Mode.SIGNUP
    //   ? this.userService.register(form.value['email'], form.value['password'] )
    //   : this.userService.login(form.value['email'], form.value['password'] )

    //observable =
      this.mode == Mode.SIGNUP
        ? this.userService.register(form.value['email'], form.value['password'])
        : this.store.dispatch(
            new AuthActions.AuthenticateStart({
              email: form.value['email'],
              password: form.value['password'],
            })
          );



    // observable.subscribe(
    //   (response) => {
    //     console.log(response);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.error = error;
    //     this.isLoading = false;
    //     this.showErrorAlert(error);
    //   },
    //   () => {
    //     console.log('completed');
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
