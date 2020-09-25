import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD6GDy1AY9uDDBa0_wcS6ON-g74_7-IUdA',
      {email, password, returnSecureToken: true})
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6GDy1AY9uDDBa0_wcS6ON-g74_7-IUdA',
      {email, password, returnSecureToken: true})
  }

}
