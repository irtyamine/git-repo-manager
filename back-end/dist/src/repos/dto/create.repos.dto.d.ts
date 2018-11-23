import { CreateBaseDto } from './create.base.dto';
export declare class CreateReposDto {
    readonly repoName: string;
    readonly timestamp: string;
    readonly master: CreateBaseDto;
    readonly develop: CreateBaseDto;
    readonly development: CreateBaseDto;
}
