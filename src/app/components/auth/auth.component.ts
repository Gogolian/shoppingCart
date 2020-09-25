import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthResponseData, UserService } from 'src/app/services/user.service'

enum Mode {
  SIGNUP = 0,
  LOGIN = 1
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: []
})
export class AuthComponent implements OnInit {
  mode = Mode.LOGIN
  isLoading = false
  error = null

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  switchMode() {
    this.mode = this.mode == Mode.SIGNUP ? Mode.LOGIN : Mode.SIGNUP
    this.error = null
  }

  onSubmit(form: NgForm){
    this.error = null
    this.isLoading = true

    let observable: Observable<AuthResponseData>


    observable =
      this.mode == Mode.SIGNUP
      ? this.userService.register(form.value['email'], form.value['password'] )
      : this.userService.login(form.value['email'], form.value['password'] )

    observable.subscribe(
      response => {
        console.log(response)
        this.isLoading = false
        this.router.navigate(['/recipes'])
      },
      error => {
        console.log(error)
        this.error = error
        this.isLoading = false
      },
      () => {
        console.log('completed')
        this.isLoading = false
      }
    )


    form.reset()
  }

}
