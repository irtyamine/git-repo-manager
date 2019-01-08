import { RepoBranchDto } from './repo.branch.dto';
import { Repo } from '../interfaces/repo.interface';

export class RepoDto implements Repo {
    repoName: string;
    timestamp: number;
    repoType: string;
    master?: RepoBranchDto;
    development?: RepoBranchDto;
}