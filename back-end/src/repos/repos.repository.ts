import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Repo } from './interfaces/repos.interface';
import { CreateReposDto } from './dto/create.repos.dto';

@Injectable()
export class ReposRepository {

    constructor(@Inject('RepoModelToken') private readonly repoModel: Model<Repo>) {  }

    async insertToDB(item: CreateReposDto): Promise<Repo> {
        const createdRepo = new this.repoModel(item);
        return await createdRepo.save();
    }

}