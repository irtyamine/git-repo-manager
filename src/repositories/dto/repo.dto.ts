import { RepoBranchesObjectDto } from './repo-branches.object.dto';
import { Repo } from '../interfaces/repo.interface';

export class RepoDto implements Repo {
    repoName: string;
    timestamp?: number;
    reposNamesUpdateTime?: number;
    repoType: string;
    branches?: RepoBranchesObjectDto;
}