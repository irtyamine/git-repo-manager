import { Injectable } from '@nestjs/common';
import { PackagesRepositoryLayer } from './repository-layer';
import { GithubRepositoryLayer } from '../authentication.controller/repository-layer';
import { PackagesInterface } from './packages.interface';
import * as semver from 'semver';
import * as shell from 'shelljs';

@Injectable()
export class PackagesService {

    constructor(private repositoryLayer: PackagesRepositoryLayer, private gitHubLayer: GithubRepositoryLayer) {  }


    public findPackage(packageName: string) {
        let arrayOfDependenciesNames = [],
            result = shell.exec(`npm search ${packageName} --json --no-description`, { silent: true }).stdout;
        for(let dependency of JSON.parse(result)) {
            arrayOfDependenciesNames.push(dependency.name);
        }
        return arrayOfDependenciesNames;
    }

    public getRecommendVersionsForNewPackage(packageName: string) {
        const result = shell.exec(`npm view ${packageName} --json versions`, { silent: true }).stdout,
            arr = JSON.parse(result),
            arrayOfRecommendVersions = arr.filter((version) => {
              return version.indexOf('-', 0) < 0;
            });
        return arrayOfRecommendVersions.filter((version) => {
           return semver.satisfies(version, `${arrayOfRecommendVersions[arrayOfRecommendVersions.length-6]} - ${arrayOfRecommendVersions[arrayOfRecommendVersions.length-1]}`);
        });
    }

    public async insertNewPackage(data: PackagesInterface, authToken: string) {
        const user = await this.gitHubLayer.getUsrData(authToken);
        const newPackageObject: PackagesInterface = {
            name: data.name,
            recommendVersion: data.recommendVersion,
            addedBy: user.role === 'admin' ? user.role : user.login,
            isImportant: data.isImportant
        };

        return await this.repositoryLayer.insertNewPackageToDB(newPackageObject);
    }

    public async getRecommendPackagesVersions() {
        let packages = [],
            result = await this.repositoryLayer.getRecommendVersions();

        for(let pkg of result) {
            packages.push({ packageName: pkg.name, version: pkg.recommendVersion });
        }

        return packages;
    }

    public async getPackages(authToken: string) {
        const user = await this.gitHubLayer.getUsrData(authToken);
        return await this.repositoryLayer.getPackages(user.login);
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
