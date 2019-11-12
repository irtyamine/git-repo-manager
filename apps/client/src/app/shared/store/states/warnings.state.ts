import WarningsModel from '../../models/warnings.model';

export interface WarningsState {
  warnings: WarningsModel[];
}

export const InitializeWarningsSate = (): WarningsState => {
  return ({
    warnings: []
  });
};
