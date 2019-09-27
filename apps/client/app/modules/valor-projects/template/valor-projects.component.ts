import { Component, OnInit } from '@angular/core';
import { HelpersService } from '../services/helpers.service';
import { RepositoriesDataService } from '../services/repositories-data.service';
import { BehaviorSubject } from 'rxjs';
import { PackageInfoInterface } from '../../../../interfaces/package-info.interface';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-valor-projects',
  templateUrl: './valor-projects.component.html',
  styleUrls: ['./valor-projects.component.scss']
})

export class ValorProjectsComponent implements OnInit {
  public tableHeader: BehaviorSubject<any>;
  public repositories: BehaviorSubject<any>;
  public elementsCounter = 0;
  public errorCondition: boolean = false;

  constructor(
    private readonly helpers: HelpersService,
    private readonly repositoriesService: RepositoriesDataService
  ) {  }

  ngOnInit() {
    this.tableHeader = this.repositoriesService.packages;
    this.repositories = this.repositoriesService.repositories;
  }

  public getTimestamp(time: any) {
    if (time) {
      return time.timestamp;
    }
  }

  public checkForFiltersCount() {
    const filters = document.getElementById('filters');

    const tableHeaderLength = document.getElementsByTagName('th').length;
    const filtersLength = filters.getElementsByTagName('div').length;

    return filtersLength === tableHeaderLength;
  }

  public addNewFilter() {
    this.elementsCounter ++;
    const packagesData = this.tableHeader.getValue();
    const packagesNames = Array.from(packagesData, (pkj: any) => pkj.name);

    const addFilter = document.getElementById('addFilter');
    const doc = document.getElementById('filters');
    const table = document.getElementById('tableHeader');

    const headerLength = table.getElementsByTagName('th').length;
    const filtersLength = doc.getElementsByTagName('div').length;

    const colon = document.createTextNode(' : ');

    if (filtersLength === headerLength) {
      return null;
    } else {
      const element = document.createElement('div');

      // SELECT FIELD
      const selectField = document.createElement('select');

      const defaultOption = document.createElement('option');
      const defaultOptionText = document.createTextNode('Choose filter...');

      defaultOption.setAttribute('selected', '');
      defaultOption.appendChild(defaultOptionText);
      selectField.appendChild(defaultOption);
      selectField.classList.add('select-field');

      for (let packageName of packagesNames) {
        const dataOption = document.createElement('option');
        const dataOptionText = document.createTextNode(packageName);

        dataOption.appendChild(dataOptionText);
        selectField.appendChild(dataOption);
      }

      // REMOVE FILTER
      const removeButton = document.createElement('button');
      removeButton.addEventListener('click', () => {
        this.removeElement(element.getAttribute('id'));
      });
      removeButton.innerHTML = '&#11198;';

      element.setAttribute('id', `filter${this.elementsCounter}`);
      element.classList.add('filters__filter');
      element.appendChild(selectField);
      element.appendChild(colon);
      element.appendChild(removeButton);
      doc.appendChild(element);
      doc.insertBefore(element, addFilter);
    }
  }

  public removeElement(id: string) {
    const elementToRemove = document.getElementById(id);
    elementToRemove.remove();
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

}
