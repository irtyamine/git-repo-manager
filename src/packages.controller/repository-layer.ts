import { Injectable, Inject } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { PackagesInterface } from './packages.interface';

@Injectable()
export class PackagesRepositoryLayer {

    constructor(@Inject('PackagesModelToken') private packageModel: Model<PackagesInterface&Document>) {  }

    public insertNewPackageToDB(item: PackagesInterface) {
        let newPackageObject = new this.packageModel(item);
        return this.packageModel.create(newPackageObject, async (err, result) => {
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
        return this.packageModel.find().select({'name': 1, 'recommendVersion': 1, '_id': 0});
    }

    public updateDependencyRecommendVersion(updateObject: PackagesInterface, param: string) {
        return this.packageModel.updateOne(
            { name: param.toString() },
            { recommendVersion: updateObject.recommendVersion.toString() },
            (err, res) => {
                if(err) throw err;
            });
    }

    public deleteDependency(dependency: string) {
        return this.packageModel.deleteOne({ name: dependency.toString() }, (err) => {
            if(err) throw err;
        });
    }
}
