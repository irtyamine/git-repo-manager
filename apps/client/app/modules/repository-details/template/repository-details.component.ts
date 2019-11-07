import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { RepositoryDetailsService } from '../services/repository-details.service';
import { StoreService } from '../../../shared/services/store.service';
import { ShieldsService } from '../../../shared/services/shields.service';
import { DependenciesService } from '../services/dependencies.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RepositoryBranchesService } from '../services/repository-branches.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../../../shared/services/data.service';

import { ModalNotifications } from './modal-notifications';

@Component({
  selector: 'repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss']
})

export class RepositoryDetailsComponent implements OnInit {
  public repositoryDetails = new BehaviorSubject<any>({});
  public warnings: Object[];
  public warningsCounter: number = 0;
  public defaultBranchesShield: string;
  public defaultBranches: Object[] = [];
  public dependencies: Object[] = [];
  public showWarningsCondition: boolean = true;
  public usrData: any;
  public modalRef: BsModalRef;
  public repositoryBranches: string[];
  public disableButtonCondition: boolean = false;
  public btnText: string = 'Compare custom branches';
  public customBranchesForm: FormGroup;
  public modalWarning = new BehaviorSubject<string>('');
  public customBranches: BehaviorSubject<any>;

  constructor(
    private readonly lsService: LocalStorageService,
    private readonly repoDetailsService: RepositoryDetailsService,
    private readonly store: StoreService,
    private readonly shields: ShieldsService,
    private readonly dependenciesService: DependenciesService,
    private readonly router: Router,
    private readonly modelService: BsModalService,
    private readonly branchesService: RepositoryBranchesService,
    private readonly formBuilder: FormBuilder,
    private readonly dataService: DataService
  ) {  }

  ngOnInit(): void {
    this.customBranchesForm = this.formBuilder.group({
      baseBranch: ['', Validators.required],
      compareBranch: ['', Validators.required]
    });

    this.getRepositoryDetails();
    this.getUserData();
  }

  public openCompareCustomBranchesModal(template: TemplateRef<any>) {
    this.disableButtonCondition = true;
    this.btnText = 'Loading...';

    this.branchesService
      .getAllBranches(this.repositoryDetails.getValue().repoName)
      .subscribe((res: any) => {
        this.repositoryBranches = res;

        this.disableButtonCondition = false;
        this.btnText = 'Compare custom branches';

        this.modalRef = this.modelService.show(template);
      });
  }

  private getRepositoryDetails() {
    return this.repoDetailsService
      .getRepositoryDetails()
      .subscribe((res: any) => {
        this.repositoryDetails.next(res);
        const repoBranches = this.repositoryDetails.getValue().branches;

        this.setDefaultBranchesShields(repoBranches);
        this.getBranches(repoBranches);

        this.dependencies = this.setRepositoryDependencies(repoBranches);
        this.checkForImportantDependencies(this.dependencies);
      });
  }

  private getUserData() {
    return this.repoDetailsService
      .getUserData()
      .subscribe((user: any) => {
        this.usrData = user;

        this.branchesService
          .getCustomBranches(
            user.login,
            this.repositoryDetails.getValue().repoName
          );

        this.customBranches = this.dataService.customBranches;
      });
  }

  private setDefaultBranchesShields(branches: any) {
    this.defaultBranchesShield = this.repoDetailsService
      .getDefaultBranchesData(
        Object.keys(branches)
      );
  }

  private getBranches(branches: any) {
    this.defaultBranches = Object.keys(branches);

    return this.defaultBranches;
  }

  private setRepositoryDependencies(branches: any) {
    return Object.keys(
      Object.assign({}, branches['master'], branches['development'])
    );
  }


  private checkForImportantDependencies(dependencies: any) {
    this.dependenciesService.checkForImportantDependencies(dependencies);

    this.warnings = this.store.getWarnings();
    this.warningsCounter = this.warnings.length;
  }


  public getDependenciesFromBranch(branchData: any) {
    return Object.keys(branchData);
  }

  public setVersionStatus(dependency: string, branchesData: any, branch: string) {
    return this.dependenciesService.compareVersions(
      { dependency, branch },
      branchesData
    );
  }

  public setShieldForDependency(dependency: string) {
    return this.shields.setShieldsForDependencies(dependency);
  }

  public setRepoDependenciesShields(dependency: any) {
    return this.shields.setRepositoryDependencies(dependency);
  }

  public showWarnings() {
    this.showWarningsCondition = !this.showWarningsCondition;
  }

  public click(nameId: string, bodyId: string, btnId: string) {
    document.getElementById(btnId).classList.toggle('btn-clicked');
    document.getElementById(nameId).classList.toggle('name-clicked');
    document.getElementById(bodyId).classList.toggle('body-clicked');
  }

  public back() {
    this.router.navigateByUrl('repositories');
  }

  public checkNewBranches() {
    const { baseBranch } = this.customBranchesForm.value;
    const { compareBranch } = this.customBranchesForm.value;

    const customBranchesNames = this.customBranches.getValue()
      .map(branches => {
        const keys = Object.keys(branches.branches);
        return {
          baseBranch: keys[0],
          compareBranch: keys[1]
        };
      });

    this.modalWarning.next('');

    const checkForMultiples = customBranchesNames.find(branches => {
      return (branches.baseBranch === baseBranch && branches.compareBranch === compareBranch)
        || (branches.baseBranch === compareBranch && branches.compareBranch === baseBranch);
    });

    if (checkForMultiples) {
      this.modalWarning.next(ModalNotifications.ALREADY_COMPARED_BRANCHES);
      return false;
    }

    if (baseBranch === compareBranch) {
      this.modalWarning.next(ModalNotifications.COMPARE_BRANCH_WITH_ITSELF);
      return false
    }

    if ((baseBranch === 'master' && compareBranch === 'development')
      || (baseBranch === 'development' && compareBranch === 'master'))
    {
      this.modalWarning.next(ModalNotifications.COMPARE_DEFAULT_BRANCHES);
      return false;
    }

    return true;
  }

  public addBranches() {
    return this.branchesService
      .setNewCustomBranchesData(
        this.customBranchesForm.value,
        this.repositoryDetails.getValue().repoName,
        this.usrData.login
      )
      .subscribe(res => {
        this.customBranchesForm.reset();
        this.customBranches.next(res);
        this.modalRef.hide();
      })
  }

  public getCustomBranches(branches: any) {
    return Object.keys(branches.branches);
  }
}
