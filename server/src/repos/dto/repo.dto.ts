import { RepoBranchDto } from './repo.branch.dto';

export class RepoDto{
    repoName: string;
    timestamp: number;
    repoType: string;
    master?: RepoBranchDto;
    development?: RepoBranchDto;
}