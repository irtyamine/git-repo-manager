import { Action } from '@ngrx/store';
import AuthModel from '../../models/auth.model';

export enum AuthActionsEnums {
  NEW_AUTH = '[AUTH] New Auth',
  GET_AUTH = '[AUTH] Get Auth'
}

export class GetAuth implements Action {
  public readonly type = AuthActionsEnums.GET_AUTH;

  constructor() {  }
}

export class CreateAuth implements Action {
  public readonly type = AuthActionsEnums.NEW_AUTH;

  constructor(public payload: AuthModel) {  }
}

export type All = GetAuth | CreateAuth;
