import { InitializeWarningsSate, WarningsState } from '../states/warnings.state';
import * as WarningsTypes from '../actions/warnings.action';

const initialize = InitializeWarningsSate();

export function WarningsReducer(
  state: WarningsState = initialize,
  action: WarningsTypes.All
) {
  switch (action.type) {
    case WarningsTypes.WarningsActionsEnum.GET_WARNINGS:
      return { ...state };

    case WarningsTypes.WarningsActionsEnum.ADD_WARNING:
      return ({
        ...state,
        warnings: state.warnings.concat(action.payload)
      });

    case WarningsTypes.WarningsActionsEnum.CLEAR_WARNINGS:
      return ({
        ...state,
        warnings: state.warnings = []
      });

    default:
      return state;
  }
}
