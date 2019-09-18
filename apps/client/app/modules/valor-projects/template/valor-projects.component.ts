import { Component, OnInit } from '@angular/core';
import { tableHeader } from '../../../../mock-data/table-header';
import { repositoriesData } from '../../../../mock-data/repositories';
import { HelpersService } from '../services/helpers.service';

@Component({
  selector: 'app-valor-projects',
  templateUrl: './valor-projects.component.html',
  styleUrls: ['./valor-projects.component.scss'],
})
export class ValorProjectsComponent implements OnInit {
  public tHeader = tableHeader;
  public repositories = repositoriesData;
  public text: string;

  constructor(private helpers: HelpersService) {  }

  ngOnInit() {}

  public tooltipText(event: string) {
    this.text = event;
  }

  public setTooltipText(tooltipText: string) {
    return 'aaaaaa';
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

    if (typeName === 'Public') {
      this.helpers.setbBgPublic(id);
      return typeName;
    } else {
      this.helpers.setbBgPrivate(id);
      return typeName;
    }

  }

  public getRepoPackage(
    branches: object,
    packageName: string,
    recommendVersion: string,
    isImportant: boolean,
    rowIndex: number
  ) {
    const firstBranch = Object.keys(branches)[0];
    const secondBranch = Object.keys(branches)[1];
    const cellId = packageName + rowIndex;

    if (!firstBranch) {
      const secondBranchPackage = branches[secondBranch][packageName];

      return this.helpers.getPackageData(
        packageName,
        null,
        secondBranchPackage,
        recommendVersion,
        isImportant,
        cellId
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
        cellId
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
        cellId
      );
    }

  }

}
