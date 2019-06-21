import { Injectable } from '@nestjs/common';
import { PackagesRepositoryLayer } from './repository-layer';
import { PackagesInterface } from './packages.interface';
import * as semver from 'semver';
import * as shell from 'shelljs';

@Injectable()
export class PackagesService {
    private arrayOfRecommendVersions: any = [];

    constructor(private repositoryLayer: PackagesRepositoryLayer) {  }


    public findPackage(packageName: string) {
        let arrayOfDependenciesNames = [],
            result = shell.exec(`npm search ${packageName} --json --no-description`, { silent: true }).stdout;
        for(let dependency of JSON.parse(result)) {
            arrayOfDependenciesNames.push(dependency.name);
        }
        return arrayOfDependenciesNames;
    }

    public getRecommendVersionsForNewPackage(packageName: string) {
        shell.exec(`npm view ${packageName} --json versions`, { silent: true }, (code, res, err) => {
          let arr = JSON.parse(res);
          this.arrayOfRecommendVersions = arr.filter((version) => {
            return version.indexOf('-', 0) < 0
              && semver.satisfies(version, `${arr[arr.length-6]} - ${arr[arr.length-1]}`);
          });
        });
        return this.arrayOfRecommendVersions;
    }

    public insertNewPackage(data: PackagesInterface) {
        const newPackageObject: PackagesInterface = {
            name: data.name,
            recommendVersion: data.recommendVersion,
            addedBy: data.addedBy,
            isImportant: data.isImportant
        };

        return this.repositoryLayer.insertNewPackageToDB(newPackageObject);
    }

    public async getRecommendPackagesVersions() {
        let packages = [],
            result = await this.repositoryLayer.getRecommendVersions();

        for(let pkg of result) {
            packages.push({ packageName: pkg.name, version: pkg.recommendVersion });
        }

        return packages;
    }

    public getPackages() {
        return this.repositoryLayer.getPackages();
    }

    public updateRecommendVersion(updateData) {
        const updatePackageObject: PackagesInterface = {
            name: updateData.dependencyName,
            recommendVersion: updateData.newVersion,
        };
        return this.repositoryLayer.updateDependencyRecommendVersion(updatePackageObject, updateData.dependencyName);
    }

    public deleteDependency(dependencyName: string) {
        return this.repositoryLayer.deleteDependency(dependencyName);
    }

}
