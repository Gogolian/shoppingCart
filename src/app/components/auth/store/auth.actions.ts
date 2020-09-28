import { Action, union } from "@ngrx/store"

export const AUTHENTICATE_START = 'AUTHENTICATE_START'
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL'
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
export const LOGOUT = 'LOGOUT'
export const SIGNUP = 'SIGNUP'


export class AuthenticateStart implements Action {
  readonly type = AUTHENTICATE_START

  constructor(public payload: {email: string, password: string}){}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL

  constructor(public payload: string){}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS

  constructor(
    public payload: {
      email: string
      userId: string
      token: string
      expirationDate: Date
    }
  ){}
}

export class Signup implements Action {
  readonly type = SIGNUP

  constructor(
    public payload: {
      email: string
      password: string
    }
  ){}
}

export class Logout implements Action {
  readonly type = LOGOUT

  constructor() {}
}

export type AuthActions = AuthenticateSuccess | Logout | AuthenticateStart | AuthenticateFail
