import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { User } from '../models/user.model'

export interface AuthResponseData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered? :string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient) { }

  register(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD6GDy1AY9uDDBa0_wcS6ON-g74_7-IUdA',
      {email, password, returnSecureToken: true}).pipe(catchError(error => this.handleError(error)),
      tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.refreshToken)))
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6GDy1AY9uDDBa0_wcS6ON-g74_7-IUdA',
      {email, password, returnSecureToken: true}).pipe(catchError(error => this.handleError(error)),
      tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.refreshToken)))
  }

  logout(){
    this.user.next(null)
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!'

    if(!errorResponse.error || !errorResponse.error.error){
      return throwError(errorMessage)
    }

    switch(errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is already taken'
        break
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'User not found. Please sign-up first'
        break
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect Password'
        break
      default:
        errorMessage = 'An unknown error occured!'
    }
    return throwError(errorMessage)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    )
    const user = new User(email, userId, token, expirationDate )
    this.user.next(user)
    localStorage.setItem('authUser', JSON.stringify(user))
  }

  autoLogin() {

    const userData : {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('authUser'))

    if (!userData) {
      return null
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )

    if(loadedUser.token) {
      this.user.next(loadedUser)
    }

  }

}
