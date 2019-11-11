export interface CBReqBodyInterface {
  repoName: string;
  userName: string;
  organization: string;
  baseBranch: string;
  compareBranch: string;
  vcs?: string;
}
