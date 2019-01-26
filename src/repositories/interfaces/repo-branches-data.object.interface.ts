import { RepoBranch } from './repoBranch';

export interface RepoBranchesDataObjectInterface  {
    master?: RepoBranch;
    development?: RepoBranch;
}