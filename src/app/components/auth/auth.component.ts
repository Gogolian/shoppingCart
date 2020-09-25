import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { UserService } from 'src/app/services/user.service'

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
  mode = Mode.SIGNUP
  isLoading = false;
  error = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  switchMode() {
    this.mode = this.mode == Mode.SIGNUP ? Mode.LOGIN : Mode.SIGNUP
    this.error = null;
  }

  onSubmit(form: NgForm){
    this.error = null;
    this.isLoading = true;
    console.log(form.value)


    if(this.mode == Mode.SIGNUP){
      this.userService.register(form.value['email'], form.value['password'] ).subscribe(
        res => {
          console.log(res)
          this.isLoading = false;
        },
        err => {
          console.log(err)
          this.error = err
          this.isLoading = false;
        },
        () => {
          console.log('completed')
          this.isLoading = false;
        }
      )
    }else{
      this.userService.login(form.value['email'], form.value['password'] ).subscribe(
        res => {
          console.log(res)
          this.isLoading = false;
        },
        err => {
          console.log(err)
          this.error = err
          this.isLoading = false;
        },
        () => {
          console.log('completed')
          this.isLoading = false;
        }
      )
    }


    form.reset()
  }

}
