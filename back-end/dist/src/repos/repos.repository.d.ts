import { Model } from 'mongoose';
import { Repo } from './interfaces/repos.interface';
import { CreateReposDto } from './dto/create.repos.dto';
export declare class ReposRepository {
    private readonly repoModel;
    constructor(repoModel: Model<Repo>);
    insertToDB(item: CreateReposDto): Promise<Repo>;
}
