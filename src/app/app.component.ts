import { Component, OnInit } from '@angular/core'
import { UserService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent implements OnInit{
  title = 'shoppingCart'

  constructor( private userService: UserService ){}

  ngOnInit() {
    this.userService.autoLogin()
  }
}
