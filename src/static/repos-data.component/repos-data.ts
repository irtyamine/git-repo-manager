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

  public modalRef: BsModalRef;
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
  public newRecommendVersion: string;
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
  public isImportant: boolean;

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
    this.auth.getUserData()
      .subscribe(res => {
         this.authUserData.login = res.login;
         this.authUserData.role = res.role;
      });
  }

  public replaceHeaderWithButton(id: string) {
    const header = document.getElementById(id),
        buttonField = document.getElementById('buttonField' + id);
    header.style.display = 'none';
    buttonField.style.display = 'inline-block';
  }

  public replaceButtonWithInput(id: string) {
    const buttonField = document.getElementById('buttonField' + id),
        inputField = document.getElementById('inputField' + id);
    buttonField.style.display = 'none';
    inputField.style.display = 'inline-block';
  }

  public replaceInputWithHeader(id: string) {
    const header = document.getElementById(id),
        inputField = document.getElementById('inputField' + id);
    header.style.display = 'inline-block';
    inputField.style.display = 'none';
  }

  public replaceButtonWithHeader(id: string) {
    const header = document.getElementById(id),
        buttonField = document.getElementById('buttonField' + id);
    header.style.display = 'inline-block';
    buttonField.style.display = 'none';
  }

  public updateDependencyRecommendVersion(event, id: string, dependency: string) {
    if(event.keyCode === 13) {
      this.getPackagesService.updateDependencyRecommendVersion({ dependencyName: dependency, newVersion: this.newRecommendVersion });
      this.replaceInputWithHeader(id);
    }
  }

  public deleteDependency(id: string, dependency: string) {
    this.getPackagesService.deleteDependency(dependency);
    this.replaceButtonWithHeader(id);
  }

  public addDependencyName(event) {
    this.keyUpDependencies.next(event);
  }

  public addNewDependencyVersion(event) {
    if(event.keyCode === 13) {
      this.getPackagesService.getVersionsBySearch(this.myForm.get('dependency').value);
    }
  }

  public selectProjectBranches(index) {
    const repositoryName = document.getElementById('repoName' + index),
        branchesCellValue = document.getElementById('branches' + index),
        selectBranchesValue = document.getElementById('selectBranches' + index);

    branchesCellValue.style.display = 'none';
    selectBranchesValue.style.display = 'inline-block';

    this.repositoriesDataService.getBranchesForSpecificProject(repositoryName.innerText);
  }

  public showBranches(index) {
    const repositoryName = document.getElementById('repoName' + index),
        newBranchesCellValue = document.getElementById('branches' + index),
        selectBranchesValue = document.getElementById('selectBranches' + index),
        span = document.getElementById('spanId' + index);

    this.repositoriesDataService.updateSingeRepository(repositoryName.textContent, this.firstSelectValue, this.secondSelectValue);

    newBranchesCellValue.style.width = 100 + '%';
    newBranchesCellValue.className = 'text';

    selectBranchesValue.style.display = 'none';
    newBranchesCellValue.style.display = 'inline-block';
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public addNewPackage() {
    this.getPackagesService.addNewPackage({
      name: this.myForm.get('dependency').value,
      recommendVersion: this.addRecommendVersion,
      addedBy: 'admin',
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

  public setStyleClassForCellValue(path, target) {
    if (target === 'name' || target === 'version' || target === 'description') {
      return !path || !path[target];
    } else {
      const data = this.packagesVersions.filter(item => item.packageName === target);
      return !path || !path[target] || this.setVersion(path[target], data[0].version);
    }
  }

  public isNone(path, target) {
    const master = this.getPackageValue(path, 0, target);
    const development = this.getPackageValue(path, 1, target);
    return master === '(none)' && development === '(none)';
  }

  public isNoneOrSame(path, target) {
    const master = this.getPackageValue(path, 0, target);
    const development = this.getPackageValue(path, 1, target);
    if(master === '(none)' && development === '(none)') {
      return true;
    } else return master === development;
  }

  public getPackageValue(repository, index, packageName) {
    const branches = Object.keys(repository);
    const branchName = branches[index];

    if (!repository[branchName]) {
      return '(none)';
    } if (repository[branchName][packageName]) {
      return repository[branchName][packageName];
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
