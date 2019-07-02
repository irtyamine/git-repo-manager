import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DataService } from '../services/data.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import * as semver from 'semver';
import { environment } from '../environments/environment';
import { TooltipConfig } from 'ngx-bootstrap/tooltip';
import { GetPackagesService } from '../services/get.packages.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

export function getAlertConfig(): TooltipConfig {
  return Object.assign(new TooltipConfig(), {
    placement: 'top',
    container: 'body',
    delay: 10
  });
}

@Component({
  selector: 'app-page',
  templateUrl: './repos-data.html',
  styleUrls: ['./repos-data.css'],
  providers: [{ provide: TooltipConfig, useFactory: getAlertConfig }]
})

export class ReposData implements OnInit{

  public selected: string;
  public reponames = [];

  public availableDependencies = [];

  public baseBranch: string = 'no selected';
  public compareBranch: string = 'no selected';
  public updateRepositoryName: string;

  public modalRef: BsModalRef;
  public pkj: string = 'no selected';
  public modalErroText: string;
  public modalErrorCondition: boolean = false;
  public newVersion: string = 'no selected';
  public updateModalCondition: boolean = true;
  public keyUp = new Subject<any>();
  public keyUpDependencies = new Subject<any>();
  public repositoriesData: BehaviorSubject<any>;
  public availableDependenciesSubject: BehaviorSubject<any>;
  public versionsSubject: BehaviorSubject<any>;
  public branchesSubject: BehaviorSubject<any>;
  public firstSelectValue: string;
  public secondSelectValue: string;
  public packagesVersions: any;
  public recommendVersionsArray: any = [];
  public errorCondition: boolean = true;
  public errorText: string;
  public text: string;
  public tableHeader: BehaviorSubject<any>;
  public defaultFilterData = {
    repoName: '',
    repoType: 'default',
    branch: 'default'
  };
  public filterData = {};
  public authUserData = {
    login: '',
    role: ''
  };

  public name: string;
  public addRecommendVersion: string;
  public isImportant: boolean = false;

  public myForm = new FormGroup({
    dependency: new FormControl(),
    dependencyVersion: new FormControl()
  });

  constructor(
      private repositoriesDataService: DataService,
      private auth: AuthService,
      private getPackagesService: GetPackagesService,
      private modalService: BsModalService
  ) {
    this.getRepositoriesFromDB();
    this.getRecommendVersions();
    this.availableDependenciesSubject = this.getPackagesService.newDependencies;
    this.repositoriesData = this.repositoriesDataService.subject;
    this.tableHeader = this.getPackagesService.tableHeadersSubject;
    this.versionsSubject = this.getPackagesService.recommendVersions;
    this.branchesSubject = this.repositoriesDataService.branchesSubject;
    this.keyUp
        .pipe(
            debounceTime(250),
            map(event => {
              return event.packageName;
            })
        ).subscribe(text => {
      console.log(text);
      this.repositoriesDataService.filteredByPackages(text, this.defaultFilterData, this.filterData);
    });
    this.keyUpDependencies
      .pipe(
          debounceTime(50),
          map(event => {
            return event.target.value;
          }),
      ).subscribe(text => {
        this.getPackagesService.getNewDependenciesBySearch(text);
      });
    this.tableHeader.subscribe(headers => {
      for (let header of headers) {
        this.filterData[header.name] = '';
      }
    });
  }

  ngOnInit(): void {
    this.repositoriesData.subscribe(repos => {
      this.reponames.length = 0;
      for (let repo of repos) {
        this.reponames.push(repo.repoName);
      }
    });
    this.availableDependenciesSubject.subscribe(dependencies => {
      this.availableDependencies.length = 0;
      for (let dependency of dependencies) {
        this.availableDependencies.push(dependency);
      }
    });
    this.auth.getUserData()
      .subscribe(res => {
         this.authUserData.login = res.login;
         this.authUserData.role = res.role;
      });
  }

  public displaySelectedProject(name: string) {
    this.updateRepositoryName = name;
    this.repositoriesDataService.getBranchesForSpecificProject(name);
  }

  public displaySelectedPackage(pkjName: string, addedBy: string) {
    if (addedBy === 'admin' && this.authUserData.role === 'member') {
      this.modalErroText = 'You dont\'t have permission to update this dependency';
      this.modalErrorCondition = true;
      setTimeout(() => {
        this.modalErrorCondition = false;
      }, 3000);
    } else {
      this.pkj = pkjName;
      this.addNewDependencyVersion(pkjName);
    }
  }

  public displayListOfVersions(version: string) {
    this.newVersion = version;
  }

  public displayBaseBranch(branchName: string) {
    this.baseBranch = branchName;
  }

  public displayCompareBranch(branchName: string) {
    this.compareBranch = branchName;
  }

  // DEPENDENCIES CONTROL, TOOLTIP CONTROL, MODAL WINDOW CONTROL, FILTERING FUNCTIONS
  public updateDependencyRecommendVersion(dependency: string, newVersion: string) {
    this.getPackagesService.updateDependencyRecommendVersion({ dependencyName: dependency, newVersion: newVersion });
    this.modalRef.hide();
    this.pkj = 'no selected';
    this.newVersion = 'no selected';
  }

  public setCustomBranchesForRepository(baseBranch: string, compareBranch: string) {
    if (baseBranch === 'default') {
      baseBranch = 'master';
    }
    if (compareBranch === 'default') {
      compareBranch = 'development';
    }

    if (baseBranch === compareBranch) {
      this.modalErrorCondition = true;
      this.modalErroText = 'Please, choose the different branches';
      setTimeout(() => {
        this.modalErrorCondition = false;
      }, 3000);
    } else {
      this.repositoriesDataService.updateSingeRepository(this.updateRepositoryName, baseBranch, compareBranch);
      this.modalRef.hide();
      this.baseBranch = 'no selected';
      this.compareBranch = 'no selected';
    }
  }

  public deleteDependency(dependency: string) {
    this.getPackagesService.deleteDependency(dependency);
  }

  public addDependencyName(event) {
    this.keyUpDependencies.next(event);
  }

  public addNewDependencyVersion(event) {
    // if(event.keyCode === 13) {
    //   this.getPackagesService.getVersionsBySearch(this.myForm.get('dependency').value);
    // }
      this.getPackagesService.getVersionsBySearch(event);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public addNewPackage() {
    this.getPackagesService.addNewPackage({
      name: this.myForm.get('dependency').value,
      recommendVersion: this.addRecommendVersion,
      isImportant: this.isImportant
    });
    this.modalRef.hide();
  }

  public tooltipText(eventValue: string) {
    this.text = eventValue;
    return this.text;
  }

  public showTooltip(value: string) {
    if(!value) {
      return false;
    }
    return value.length > 20;
  }

  public getRepositoriesFromDB() {
    return this.repositoriesDataService.loadReposNames().subscribe(reposNames => {
      for(let name of reposNames) {
        this.repositoriesDataService.getReposData(name);
      }
    }, err => {
      console.log(err);
      this.errorCondition = false;
      this.errorText = err;
      setTimeout(() => { this.errorCondition = true; }, 3000);
    });
  }

  public getRecommendVersions() {
    this.getPackagesService.getRecommendVersions().subscribe(data => {
      this.packagesVersions = data;
    });
  }

  public filtration(pkjName: string) {
    this.keyUp.next({ packageName: pkjName });
  }

  public filterByPrivacy() {
    this.repositoriesDataService.filteredByPackages('', this.defaultFilterData, this.filterData);
  }

  public filterBranches() {
    this.repositoriesDataService.filteredByPackages('', this.defaultFilterData, this.filterData);
  }

  // TABLE DISPLAYING
  public isBranch(path) {
    const keys = Object.keys(path);
    return !keys[0] || !keys[1];
  }

  public getBranchName(repository, indexOfName) {
    const keys = Object.keys(repository);
    if (keys[indexOfName]) {
      return keys[indexOfName];
    } else {
      return null;
    }
  }

  public setStyleClassForCellValue(path: Object, branchName: string, target: string) {
    if (!path[branchName] && Object.keys(path).length === 2) {
      const keys = Object.keys(path);
      let customBranchObject = {};
      branchName === 'master' ? customBranchObject = path[keys[0]] : customBranchObject = path[keys[1]];
      if (target === 'name' || target === 'version' || target === 'description') {
        return !customBranchObject[target];
      } else {
        const recommendVersion = this.packagesVersions.filter(item => item.packageName === target);
        return !customBranchObject[target] || this.setVersion(customBranchObject[target], recommendVersion[0].version);
      }
    } else if (target === 'name' || target === 'version' || target === 'description') {
      const findObject = path[branchName];
      return !findObject || !findObject[target];
    } else {
      const findObject = path[branchName];
      const data = this.packagesVersions.filter(item => item.packageName === target);
      return !findObject || !findObject[target] || this.setVersion(findObject[target], data[0].version);
    }
  }

  public isNone(path, target) {
    const master = this.getPackageValue(path, 'master', target);
    const development = this.getPackageValue(path, 'development', target);
    return master === '(none)' && development === '(none)';
  }

  public isNoneOrSame(path, target) {
    const master = this.getPackageValue(path, 'master', target);
    const development = this.getPackageValue(path, 'development', target);
    if(master === '(none)' && development === '(none)') {
      return true;
    } else return master === development;
  }

  public getPackageValue(repository: Object, branchName: string, packageName: string) {
    if (!repository[branchName] && Object.keys(repository).length === 2) {
      const keys = Object.keys(repository);
      let customBranch = {};
      branchName === 'master' ? customBranch = repository[keys[0]] : customBranch = repository[keys[1]];
      if (customBranch[packageName]) {
        return customBranch[packageName];
      } else {
        return '(none)';
      }
    } else if (!repository[branchName]) {
      return '(none)';
    } else {
      const findObject = repository[branchName];
      if (findObject[packageName]) {
        return findObject[packageName];
      } else {
        return '(none)';
      }
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

  public setVersion(version, configVersion) {
    try {
      return semver.lt(version, configVersion);
    } catch (err) {
      return true;
    }
  }

  public logOut() {
    window.location.href = `${environment.url}/repositories2/logout`;
  }
}
