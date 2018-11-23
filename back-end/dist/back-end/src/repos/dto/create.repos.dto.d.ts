import { CreateBaseDto } from './create.base.dto';
export declare class CreateReposDto {
    readonly repoName: string;
    readonly timestamp: number;
    readonly repoType: string;
    readonly master?: CreateBaseDto;
    readonly develop?: CreateBaseDto;
    readonly development?: CreateBaseDto;
}
