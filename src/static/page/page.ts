import { Component, OnInit } from '@angular/core';
import { GetRepositoriesService } from '../services/get.repositories.service';
import { DataService } from '../services/data.service';
import { Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as semver from 'semver';

@Component({
  selector: 'app-page',
  templateUrl: './page.html',
  styleUrls: ['./page.css'],
})

export class Page implements OnInit {

  private keyUp = new Subject<any>();
  public repositoriesData: any;
  public packagesVersions: any;

  constructor(
    private reposService: GetRepositoriesService,
    private repositoriesDataService: DataService,
  ) {
    this.keyUp
      .pipe(
        map(event => {
          const version = event.event.target.value;
          const packageName = event.pack;
          return { version, packageName };
        }),
        debounceTime(150),
        distinctUntilChanged()
      ).subscribe(text => {
        this.repositoriesDataService.filterByPackages(text);
      });
    this.getRepositoriesFromDB();
  }

  ngOnInit() {
    this.getRecommendVersions();
    this.repositoriesData = this.repositoriesDataService.subject;
    setTimeout(() => {
      this.getRepositoriesFromDB();
    }, 65000);
  }

  private getRepositoriesFromDB() {
    this.repositoriesDataService.loadReposNames().subscribe(reposNames => {
      for(let name of reposNames) {
        this.repositoriesDataService.getNames(name.repoName);
      }
    });
  }

  public getRecommendVersions() {
    this.reposService.getRecommendVersionDataConfig().subscribe(data => {
      this.packagesVersions = data;
    });
  }

  public filtration(packageName: string, event: any) {
    this.keyUp.next({ event: event, pack: packageName });
  }

  public filterByPrivacy(value: string) {
    this.repositoriesDataService.filterByPrivacyAndBranches(value);
  }

  public filterBranches(value: string) {
    this.repositoriesDataService.filterByPrivacyAndBranches(value);
  }

  public isBranch(path) {
    if (Object.keys(path).length === 1) {
      return true;
    } else {
      return false;
    }
  }

  public getBranch(repository, branchName) {
    if (repository[branchName]) {
      return branchName;
    } else {
      return null;
    }
  }

  public getStyleClassForVersion(path, target) {
    if (!path || !path[target] || Page.setVersion(path[target], this.packagesVersions[target])) {
      return true;
    } else {
      return false;
    }
  }

  public getStyleClassForText(path, target) {
    if (!path || !path[target]) {
      return true;
    } else  {
      return false;
    }
  }

  public isNone(path, target) {
    const master = this.getPackageValue(path.master, target);
    const development = this.getPackageValue(path.development, target);
    if(master === '(none)' && development === '(none)') {
      return true;
    } else {
      return false;
    }
  }

  public isNoneOrSame(path, target) {
    const master = this.getPackageValue(path.master, target);
    const development = this.getPackageValue(path.development, target);
    if(master === '(none)' && development === '(none)') {
      return true;
    } else if (master === development) {
      return true;
    } else {
      return false;
    }
  }

  public getPackageValue(repository, packageName) {
    if (!repository) {
      return '(none)';
    } if (repository[packageName]) {
      return repository[packageName];
    } else {
      return '(none)';
    }
  }

  public lastUpdate(time) {
    let milliseconds = Date.now() - time,
      seconds = Math.floor(milliseconds / 1000),
      minutes = Math.floor(milliseconds / (1000 * 60)),
      hours = Math.floor(milliseconds / (1000 * 60 * 60)),
      days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)),
      result = '';

    seconds < 60 ? result += seconds + ' sec'
      : minutes < 60 ? result += minutes + ' min'
      : hours < 24 ? result += hours + ' hrs' : result += days + ' d';
    return result;
  }

  public logOut() {
    window.location.href = 'http://cf83561e.ngrok.io/repositories2/logout';
  }

  private static setVersion(version, configVersion) {
    const clearVersion = semver.coerce(version);
    return semver.lt(clearVersion.raw, configVersion);
  }
}
