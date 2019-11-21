import { AuthState, initializeState } from '../states/auth.state';
import * as AuthActions from '../actions/auth.action';
import { AuthActionsEnums } from '../actions/auth.action';

const initialState = initializeState();

export function AuthReducer(state: AuthState = initialState, action: AuthActions.All) {
  switch (action.type) {
    case AuthActions.AuthActionsEnums.GET_AUTH: {
      return { ...state, authorized: false };
    }

    case AuthActionsEnums.NEW_AUTH: {
      return ({
       ...state,
       auth: action.payload,
       authorized: false
      });
    }

    default:
      return state;
  }
}
