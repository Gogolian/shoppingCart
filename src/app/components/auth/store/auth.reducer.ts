import { Action } from '@ngrx/store';
import { User } from '../../../models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
}
