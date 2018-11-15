import { CreateBaseDto } from './create.base.dto';

export class CreateReposDto {
    readonly repoName: string;
    readonly timestamp: Date;
    readonly repoType: string;
    readonly master?: CreateBaseDto;
    readonly develop?: CreateBaseDto;
    readonly development?: CreateBaseDto;
}