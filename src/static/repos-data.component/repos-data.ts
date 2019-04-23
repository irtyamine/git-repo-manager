import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DataService } from '../services/data.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as semver from 'semver';
import { environment } from '../environments/environment';
import { TooltipConfig } from 'ngx-bootstrap/tooltip';
import { GetPackagesService } from '../services/get.packages.service';

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

export class ReposData implements OnInit {

  public modalRef: BsModalRef;
  public keyUp = new Subject<any>();
  public repositoriesData: BehaviorSubject<any>;
  public packagesVersions: any;
  public recommendVersionsArray: any = [];
  public errorCondition: boolean = true;
  public errorText: string;
  public text: string;
  public isCollapsed: boolean = true;
  public tableHeader: BehaviorSubject<any>;

  public name: string;
  public version: string;
  public isImportant: boolean;

  constructor(
    private repositoriesDataService: DataService,
    private getPackagesService: GetPackagesService,
    private modalService: BsModalService
  ) {
    this.getRepositoriesFromDB();
    this.getRecommendVersions();
    this.repositoriesData = this.repositoriesDataService.subject;
    this.tableHeader = this.getPackagesService.tableHeadersSubject;
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

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public addNewPackage() {
    this.getPackagesService.addNewPackage({ name: this.name, _package: { recommendVersion: this.version, addedBy: 'admin', isImportant: this.isImportant }});
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
      console.log(this.packagesVersions);
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

  // TABLE DISPLAYING
  public isBranch(path) {
    return !path.master || !path.development;
  }

  public getBranchName(repository, branchName) {
    if (repository[branchName]) {
      return branchName;
    } else {
      return null;
    }
  }

  public setStyleClassForCellValue(path, target) {
    if (target === 'name' || target === 'version' || target === 'description') {
      return !path || !path[target];
    } else {
      return !path || !path[target] || this.setVersion(path[target], this.packagesVersions[target]);
    }
  }

  public isNone(path, target) {
    const master = this.getPackageValue(path.master, target);
    const development = this.getPackageValue(path.development, target);
    return master === '(none)' && development === '(none)';
  }

  public isNoneOrSame(path, target) {
    const master = this.getPackageValue(path.master, target);
    const development = this.getPackageValue(path.development, target);
    if(master === '(none)' && development === '(none)') {
      return true;
    } else return master === development;
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
