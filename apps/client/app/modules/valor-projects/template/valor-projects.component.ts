import { Component, OnInit } from '@angular/core';
import { HelpersService } from '../services/helpers.service';
import { DataService } from '../services/data.service';
import { FiltrationService } from '../services/filtration.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { PackageInfoInterface } from '../interfaces/package-info.interface';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-valor-projects',
  templateUrl: './valor-projects.component.html',
  styleUrls: ['./valor-projects.component.scss']
})

export class ValorProjectsComponent implements OnInit {
  public tableHeader: BehaviorSubject<any>;
  public repositories: BehaviorSubject<any>;
  public errorCondition: boolean = false;
  private keyup = new Subject<any>();
  private elementsCounter = 0;
  private filteringKey: string;
  private filteringValue: string;
  private defaultRepos: BehaviorSubject<any>;

  constructor(
    private readonly helpers: HelpersService,
    private readonly repositoriesService: DataService,
    private readonly filtration: FiltrationService
  ) {
    this.keyup
      .pipe(
        debounceTime(450),
        map(filterValue => {
          return filterValue;
        })
      ).subscribe((text: string) => {
        this.filteringValue = text;
        const newFilteringObject = {
          key: this.filteringKey,
          value: this.filteringValue
        };
        const result = this.filtration.setFilterOptions(newFilteringObject);
        this.repositories.next(result);
    });
  }

  ngOnInit() {
    this.tableHeader = this.repositoriesService.packages;
    this.repositories = this.repositoriesService.repositories;
    this.defaultRepos = this.repositoriesService.repositories;
  }

  public getTimestamp(time: any) {
    if (time) {
      return time.timestamp;
    }
    return undefined;
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
      element.setAttribute('id', `filter${this.elementsCounter}`);
      element.classList.add('filters__filter');

      // SELECT FIELD
      const selectField = document.createElement('select');
      selectField.setAttribute('id', `select${this.elementsCounter}`);
      selectField.classList.add('select-field');

      const defaultOption = document.createElement('option');
      const defaultOptionText = document.createTextNode('Choose filter...');

      defaultOption.setAttribute('selected', '');
      defaultOption.appendChild(defaultOptionText);
      selectField.appendChild(defaultOption);

      for (let packageName of packagesNames) {
        const dataOption = document.createElement('option');
        const dataOptionText = document.createTextNode(packageName);

        dataOption.setAttribute('value', packageName);
        dataOption.appendChild(dataOptionText);
        selectField.appendChild(dataOption);
      }

      // INSERT FILTERING VALUE
      const inputField = document.createElement('input');
      inputField.setAttribute('placeholder', 'Input filtering parameter');
      inputField.setAttribute('autocomplete', 'off');
      inputField.addEventListener('keyup', (event: Event) => {
        const selectId = selectField.getAttribute('id');
        this.filteringKey = (<HTMLInputElement> document.getElementById(selectId)).value;

        this.keyup.next((<HTMLTextAreaElement> event.target).value);
      });

      // REMOVE FILTER
      const removeButton = document.createElement('button');
      removeButton.innerHTML = '&#11198;';
      removeButton.classList.add('remove-button');
      removeButton.addEventListener('click', () => {
        this.removeElement(
          element.getAttribute('id'),
          selectField.getAttribute('id'
          ));
      });

      element.appendChild(selectField);
      element.appendChild(colon);
      element.appendChild(inputField);
      element.appendChild(removeButton);

      doc.appendChild(element);
      doc.insertBefore(element, addFilter);
    }
  }

  public removeElement(elementId: string, selectId: string) {
    const elementToRemove = document.getElementById(elementId);
    const selectToRemove = (<HTMLInputElement> document.getElementById(selectId)).value;

    const result = this.filtration.removeFilter(selectToRemove);
    this.repositories.next(result);

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
