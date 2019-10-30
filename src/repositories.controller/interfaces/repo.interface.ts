import { RepoBranchesDataObjectInterface } from './repo-branches-data.object.interface';

export interface Repo {
  repoName: string;
  repoType?: string;
  timestamp?: number;
  addedBy?: string;
  branches?: {};
}
