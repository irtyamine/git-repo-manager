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

  public getBranches(branches: object, rowIndex: number) {
    const id = 'branches' + rowIndex;
    const rowId = 'row' + rowIndex;
    const firstBranch = Object.keys(branches)[0];
    const secondBranch = Object.keys(branches)[1];

    if (Object.keys(branches).length > 1) {
      this.helpers.setRowBefore('before_success', rowId);
      return `${firstBranch} \u2192 ${secondBranch}`;
    } else {
      this.helpers.setRowBefore('before_danger', rowId);
      this.helpers.setRowBgDanger(id);
      return firstBranch;
    }
  }

  public getRepositoryType(typeName: string, rowIndex: number) {
    const id = 'repoType' + rowIndex;
    const row = document.getElementById(id);

    if (typeName === 'Public') {
      row.className = 'public';
      return typeName;
    } else {
      row.className = 'private';
      return typeName;
    }
  }

  public getRepoPackage(
    branches: object,
    packageData: PackageInfoInterface,
    rowIndex: number
  ) {
    const firstBranch = Object.keys(branches)[0];
    const secondBranch = Object.keys(branches)[1];
    const packageName = packageData.name;
    const recommendVersion = packageData.recommendVersion;
    const isImportant = packageData.isImportant;
    const cellId = packageData.name + rowIndex;
    const rowId = 'row' + rowIndex;

    if (!firstBranch) {
      const secondBranchPackage = branches[secondBranch][packageName];

      return this.helpers.getPackageData(
        packageName,
        null,
        secondBranchPackage,
        recommendVersion,
        isImportant,
        cellId,
        rowId
      );
    }
    else if (!secondBranch) {
      const firstBranchPackage = branches[firstBranch][packageName];

      return this.helpers.getPackageData(
        packageName,
        firstBranchPackage,
        null,
        recommendVersion,
        isImportant,
        cellId,
        rowId
      );
    }
    else {
      const secondBranchPackage = branches[secondBranch][packageName];
      const firstBranchPackage = branches[firstBranch][packageName];

      return this.helpers.getPackageData(
        packageName,
        firstBranchPackage,
        secondBranchPackage,
        recommendVersion,
        isImportant,
        cellId,
        rowId
      );
    }

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
