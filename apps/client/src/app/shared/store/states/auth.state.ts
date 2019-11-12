import AuthModel from '../../models/auth.model';

export interface AuthState {
  auth: AuthModel;
  authorized: boolean;
}

export const initializeState = (): AuthState => {
  return ({
    auth: null,
    authorized: false
  });
};
