export interface GithubRepositoryInterface {
  repoName: string;
  repoType: string;
  organization: string;
  dataSource: string;
  timestamp: number;
  branches: object;
}
