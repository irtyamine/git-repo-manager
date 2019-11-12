import { Injectable } from '@angular/core';
import { StoreService } from '../../../shared/services/store.service';
import { DataService } from '../../../shared/services/data.service';
import { BehaviorSubject } from 'rxjs';
import * as semver from 'semver';

@Injectable()
export class DependenciesService {

  private packages: BehaviorSubject<any>;

  constructor(
    private readonly store: StoreService,
    private readonly dataService: DataService
  ) {
    this.packages = this.dataService.packages;
  }

  public compareVersions(dependency: string, repositoryData: any) {
    const packageData = this.packages.getValue()
      .find((pkg: any) => pkg.name === dependency);
    const dependencyVersion = repositoryData[dependency];

    if (!packageData || !packageData.recommendVersion) {
      return 'success';
    }

    try {
      if (semver.lt(dependencyVersion, packageData.recommendVersion)) {
        return 'danger';
      }
    } catch (error) {
      return 'danger';
    }

    return 'success';
  }

  public checkForImportantDependencies(dependencies) {
    const importantDependencies = this.packages.getValue().filter(
      (pkg: any) => pkg.isImportant);

    for (let importantDependency of importantDependencies) {
      const res = dependencies.find(
        (dependency: any) =>
          dependency === importantDependency.name);

      if (!res) {
        this.store
          .setWarnings(
            importantDependency.name,
            `important dependency '${importantDependency.name}' missed`
          );
      }
    }
  }

}
