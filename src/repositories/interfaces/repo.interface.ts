import { RepoBranch } from './repoBranch';

export interface Repo {
  repoName: string;
  timestamp: number;
  repoType: string;
  master?: RepoBranch;
  development?: RepoBranch;
}
