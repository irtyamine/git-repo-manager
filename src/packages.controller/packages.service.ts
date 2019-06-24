import { Injectable } from '@nestjs/common';
import { PackagesRepositoryLayer } from './repository-layer';
import { PackagesInterface } from './packages.interface';

@Injectable()
export class PackagesService {

    constructor(private repositoryLayer: PackagesRepositoryLayer) {  }

    public insertNewPackage(data: PackagesInterface) {
        const newPackageObject: PackagesInterface = {
            name: data.name,
            _package: {
                recommendVersion: data._package.recommendVersion,
                addedBy: data._package.addedBy,
                isImportant: data._package.isImportant
            }
        };

        return this.repositoryLayer.insertNewPackageToDB(newPackageObject);
    }

    public async getRecommendPackagesVersions() {
        let packages = [],
            result = await this.repositoryLayer.getRecommendVersions();

        for(let pkg of result) {
            packages.push({ packageName: pkg.name, version: pkg._package.recommendVersion });
        }

        return packages;
    }

    public getPackages() {
        return this.repositoryLayer.getPackages();
    }

}
