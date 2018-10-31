import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Repo } from '../database/interfaces/repos.interface/repo.interface';
import { CreateRepoDto } from '../database/dto/repos.dto/create.repo.dto';

@Injectable()
export class ReposDbService {

    constructor(@Inject('RepoModelToken') private readonly repoModel: Model<Repo>) {  }

    async insertToDB(item: CreateRepoDto): Promise<Repo> {
        const createdRepo = new this.repoModel(item);
        return await createdRepo.save();
    }
}