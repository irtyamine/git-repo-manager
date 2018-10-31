import { Document } from 'mongoose';
import { RepoMasterInterface } from './repo.master.interface';
import { RepoDevelopInterface } from './repo.develop.interface';
import { RepoDevelopmentInterface } from './repo.development.interface';

export interface Repo extends Document{
    readonly repoName: string,
    readonly timestamp: string,
    readonly master: RepoMasterInterface
    readonly develop: RepoDevelopInterface
    readonly development: RepoDevelopmentInterface
}