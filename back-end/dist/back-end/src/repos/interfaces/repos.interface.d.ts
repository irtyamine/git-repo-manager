import { Document } from 'mongoose';
import { BaseInterface } from './base.interface';
export interface Repo extends Document {
    readonly repoName: string;
    readonly timestamp: number;
    readonly repoType: string;
    readonly master: BaseInterface;
    readonly develop: BaseInterface;
    readonly development: BaseInterface;
}
