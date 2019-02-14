import { RepoBranchesObjectDto } from './repo-branches.object.dto';
import { Repo } from '../interfaces/repo.interface';
export declare class RepoDto implements Repo {
    repoName: string;
    timestamp?: number;
    repoType: string;
    branches?: RepoBranchesObjectDto;
}
