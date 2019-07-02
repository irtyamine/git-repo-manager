/// <reference path="../../node_modules/@types/mongoose/index.d.ts" />
import { Model, Document } from 'mongoose';
import { Repo } from './interfaces/repo.interface';
import { RequestBodyInterface } from './interfaces/request.body.interface';
export declare class GitHubRepositoriesRepositoryLayer {
    private repoModel;
    private updateRepoModel;
    constructor(repoModel: Model<Repo & Document>, updateRepoModel: Model<RequestBodyInterface & Document>);
    insertReposNamesToDB(item: Repo, parameter?: string): void;
    updateSingleRepository(data: RequestBodyInterface): void;
    deleteRepository(repoName: string, addedBy: string): void;
    setBranchesToDefault(repoName: string, userLogin: string): import("mongoose").Query<any>;
    insertSingleRepositoryToDB(item: Repo): void;
    findRepositoriesNames(): import("mongoose").DocumentQuery<(Repo & Document)[], Repo & Document, {}>;
    getRepositoryNameAndTypeToUpdate(): import("mongoose").DocumentQuery<(Repo & Document)[], Repo & Document, {}>;
    findRepositoryData(parameter: string, userLogin: string): Promise<Repo & Document>;
    getAllRepos(userLogin: string): Promise<(Repo & Document)[]>;
}
