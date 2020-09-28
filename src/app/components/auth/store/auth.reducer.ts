import { Action } from '@ngrx/store'
import { User } from '../../../models/user.model'

export interface State {
  user: User
}

const initialState: State = {
  user: null
}

export function authReducer(state: State = initialState, action: Action) {
  return state
}
