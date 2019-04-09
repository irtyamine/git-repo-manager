import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as semver from 'semver';

@Component({
  selector: 'app-page',
  templateUrl: './page.html',
  styleUrls: ['./page.css'],
})

export class Page implements OnInit {

  public keyUp = new Subject<any>();
  public repositoriesData: BehaviorSubject<any>;
  public packagesVersions: any;
  public text: string;

  constructor(
    private repositoriesDataService: DataService
  ) {
    this.getRepositoriesFromDB();
    this.getRecommendVersions();
    this.repositoriesData = this.repositoriesDataService.subject;
    this.keyUp
      .pipe(
        map(event => {
          const version = event.event;
          const packageName = event.pack;
          return { version, packageName };
        }),
        debounceTime(150),
        distinctUntilChanged()
      ).subscribe(text => {
        this.repositoriesDataService.filterByPackages(text);
      });
  }

  ngOnInit() {
    setTimeout(() => {
      this.getRepositoriesFromDB();
    }, 65000);
  }

  public getRepositoriesFromDB() {
    return this.repositoriesDataService.loadReposNames().subscribe(reposNames => {
      for(let name of reposNames) {
        this.repositoriesDataService.getReposData(name);
      }
    });
  }

  public getRecommendVersions() {
    return this.repositoriesDataService.getVersions().subscribe(data => {
      this.packagesVersions = data;
    });
  }

  public filtration(packageName: string, event: string) {
    this.keyUp.next({ event: event, pack: packageName });
  }

  public filterByPrivacy(value: string) {
    this.repositoriesDataService.filterByPrivacyAndBranches(value);
  }

  public filterBranches(value: string) {
    this.repositoriesDataService.filterByPrivacyAndBranches(value);
  }

  public isBranch(path) {
    if (!path.master || !path.development) {
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
    if (!path || !path[target] || this.setVersion(path[target], this.packagesVersions[target])) {
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
      this.text = master;
      return true;
    } else {
      this.text = `${master} &rarr; ${development}`;
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

  public setVersion(version, configVersion) {
    const clearVersion = semver.coerce(version);
    return semver.lt(clearVersion.raw, configVersion);
  }
}
