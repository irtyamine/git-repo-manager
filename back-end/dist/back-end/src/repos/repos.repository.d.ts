/// <reference path="../../../../../node_modules/@types/mongoose/index.d.ts" />
import { Model } from 'mongoose';
import { Repo } from './interfaces/repo.interface';
import { RepoDto } from './dto/repo.dto';
export declare class GitHubRepositoriesRepository {
    private readonly repoModel;
    constructor(repoModel: Model<Repo>);
    insertToDB(item: RepoDto): Promise<void>;
    findRepositoriesData(): import("mongoose").DocumentQuery<Repo[], Repo, {}>;
}
