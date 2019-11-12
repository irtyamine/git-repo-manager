import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelpersService } from '../services/helpers.service';
import { DataService } from '../../../shared/services/data.service';
import { BehaviorSubject } from 'rxjs';
import { PackageInfoInterface } from '../interfaces/package-info.interface';
import { StoreService } from '../../../shared/services/store.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { FiltrationService } from '../services/filtration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-valor-projects',
  templateUrl: './company-projects.component.html',
  styleUrls: ['./company-projects.component.scss']
})

export class CompanyProjectsComponent implements OnInit, OnDestroy {
  public tableHeader: BehaviorSubject<any>;
  public repositories: BehaviorSubject<any>;
  private defaultRepos: BehaviorSubject<any>;
  public usrData: object;
  public authData: any;

  constructor(
    private readonly store: StoreService,
    private readonly helpers: HelpersService,
    private readonly repositoriesService: DataService,
    private readonly router: Router,
    private readonly filterService: FiltrationService,
    private readonly lsService: LocalStorageService
  ) {
    this.authData = this.store.getAuthData();
  }

  ngOnInit() {
    this.store.clearWarnings();
    this.tableHeader = this.repositoriesService.packages;
    this.repositories = this.repositoriesService.repositories;
    this.defaultRepos = this.repositoriesService.repositories;

    this.lsService.removeItem('repository');
    this.getUserData();
  }

  ngOnDestroy(): void {
    this.filterService.clearFilters();
  }

  public getTimestamp(time: any) {
    if (time) {
      return time.timestamp;
    }
    return undefined;
  }

  public getBranches(branches: any, rowIndex: number) {
    const id = 'branches' + rowIndex;
    const rowId = 'row' + rowIndex;
    const { baseBranch, compareBranch } = branches;

    if (!baseBranch) {
      this.helpers.setRowBefore('before_danger', rowId);
      this.helpers.setRowBgDanger(id);
      return `${compareBranch.branchName}`
    }

    if (!compareBranch) {
      this.helpers.setRowBefore('before_danger', rowId);
      this.helpers.setRowBgDanger(id);
      return `${baseBranch.branchName}`
    }

    this.helpers.setRowBefore('before_success', rowId);
    return `${baseBranch.branchName} \u2192 ${compareBranch.branchName}`
  }

  public setRepositoryType(typeName: string) {
    return typeName.toLowerCase();
  }

  public getPkjData(
    branches: any,
    packageData: PackageInfoInterface,
    rowIndex: number
  ) {
    const { name, isImportant, recommendVersion } = packageData;
    const { baseBranch, compareBranch } = branches;

    const data = {
      base: '',
      compare: '',
      isImportant: isImportant,
      minVersion: recommendVersion,
      rowId: 'row' + rowIndex,
      id: name + rowIndex,
    };

    if (!baseBranch) {
      data.base = 'N/A';
      data.compare = compareBranch[name];

      return this.helpers.getDependencies(data);
    }

    if (!compareBranch) {
      data.base = baseBranch[name];
      data.compare = 'N/A';

      return this.helpers.getDependencies(data);
    }

    data.base = baseBranch[name];
    data.compare = compareBranch[name];

    return this.helpers.getDependencies(data);
  }


  public getUserData() {
    return this.repositoriesService.getUserData()
      .subscribe(res => {
        this.usrData = res;
      });
  }

  public navigateToDetailsPage(route: string) {
    this.lsService.setItem('repository', route);
    this.router.navigate(['repositories', route]);
  }
}
