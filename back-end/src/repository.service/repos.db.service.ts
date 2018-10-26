import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Repo } from '../interfaces/repo.interface';
import repoConfig from '../parameters/repo-data-config';
import { CreateRepoDto } from '../dto/create-repo.dto';

@Injectable()
export class ReposDbService {

    constructor(@Inject('RepoModelToken') private readonly repoModel: Model<Repo>) {  }

    async insertToDB(item: CreateRepoDto): Promise<Repo> {
        const createdRepo = new this.repoModel(item);
        const result = await createdRepo.save({ validateBeforeSave: false });
        const res = await this.findById(result._id);
        return res[0]
    }

    async findById(parameter): Promise<Repo[]> {
        return await this.repoModel.find({_id: parameter }).exec();
    }

    async findAll(): Promise<Repo[]> {
        return await this.repoModel.find().sort({ $natural: -1 }).limit(repoConfig.repositories.length);
    }
}