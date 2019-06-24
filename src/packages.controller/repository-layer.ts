import { Injectable, Inject } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { PackagesInterface } from './packages.interface';

@Injectable()
export class PackagesRepositoryLayer {

    constructor(@Inject('PackagesModelToken') private packageModel: Model<PackagesInterface&Document>) {  }

    public insertNewPackageToDB(item: PackagesInterface) {
        let newPackageObject = new this.packageModel(item);
        this.packageModel.create(newPackageObject, async (err, result) => {
            if (err) throw err;
        });
    }

    public getPackagesNames() {
        return this.packageModel.find().select({'name': 1, '_id': 0});
    }

    public getPackages() {
        return this.packageModel.find().select({'_id': 0});
    }

    public getRecommendVersions() {
        return this.packageModel.find().select({'name': 1, '_package.recommendVersion': 1, '_id': 0});
    }
}
