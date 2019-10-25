import { Action } from '@ngrx/store';
import WarningsModel from '../../models/warnings.model';

export enum WarningsActionsEnum {
  GET_WARNINGS = '[WARNING] Get Warnings',
  ADD_WARNING = '[WARNING] Add Warning',
  CLEAR_WARNINGS = '[WANING] Clear Warnings'
}

export class GetWarnings implements Action {
  public readonly type = WarningsActionsEnum.GET_WARNINGS;

  constructor() {  }
}

export class AddWarning implements Action {
  public readonly type = WarningsActionsEnum.ADD_WARNING;

  constructor(public payload: WarningsModel) {  }
}

export class ClearWarnings implements Action {
  public readonly type = WarningsActionsEnum.CLEAR_WARNINGS;

  constructor(public payload: WarningsModel) {  }
}

export type All = GetWarnings | AddWarning | ClearWarnings;
