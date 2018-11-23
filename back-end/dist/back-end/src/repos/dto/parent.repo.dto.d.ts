import { RepoBranchDto } from './repo.branch.dto';
export declare class ParentRepoDto {
    readonly repoName: string;
    readonly timestamp: number;
    readonly repoType: string;
    readonly master?: RepoBranchDto;
    readonly develop?: RepoBranchDto;
    readonly development?: RepoBranchDto;
}
