export interface CustomBranchesInterface {
  repoName: string;
  addedBy: string;
  organization: string;
  vcs: string;
  branches: {
    baseBranch: object;
    compareBranch: object;
  };
}
