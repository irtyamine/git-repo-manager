import { RepoBranchesDataObjectInterface } from './repo-branches-data.object.interface';

export interface Repo {
  repoName: string;
  timestamp?: number;
  repoType: string;
  branches?: RepoBranchesDataObjectInterface;
}
