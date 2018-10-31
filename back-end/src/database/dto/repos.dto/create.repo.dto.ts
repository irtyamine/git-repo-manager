import { CreateRepoMasterDto } from './create.repo.master.dto';
import { CreateRepoDevelopDto } from './create.repo.develop.dto';
import { CreateRepoDevelopmentDto } from './create.repo.development.dto';

export class CreateRepoDto {
    readonly repoName: string;
    readonly timestamp: string;
    readonly master: CreateRepoMasterDto;
    readonly develop: CreateRepoDevelopDto;
    readonly development: CreateRepoDevelopmentDto;
}