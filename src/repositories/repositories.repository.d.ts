/// <reference path="../../node_modules/@types/mongoose/index.d.ts" />
import { Model, Document } from 'mongoose';
import { RepoDto } from './dto/repo.dto';
import { Repo } from './interfaces/repo.interface';
export declare class GitHubRepositoriesRepository {
    private repoModel;
    constructor(repoModel: Model<Repo & Document>);
    firsInsertToDB(item: RepoDto, parameter?: string): void;
    insertToDB(item: RepoDto): void;
    findRepositoriesData(parameter: any): import("mongoose").DocumentQuery<Repo & Document, Repo & Document, {}>;
}
