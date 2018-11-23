import { Document } from 'mongoose';
import { RepoBranchInterface } from './repo.branch.interface';
export interface Repo extends Document {
    readonly repoName: string;
    readonly timestamp: number;
    readonly repoType: string;
    readonly master?: RepoBranchInterface;
    readonly development?: RepoBranchInterface;
}
