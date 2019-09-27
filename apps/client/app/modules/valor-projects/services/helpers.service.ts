import { Injectable } from '@angular/core';
import * as semver from 'semver';

@Injectable()
export class HelpersService {

  public setRowBefore(newClassName: string, rowId: string) {
    const row = document.getElementById(rowId);
    if (row) {
      row.classList.add(newClassName);
    }
  }

  public setRowBgDanger(id: string) {
    const row = document.getElementById(id);
    row.classList.add('row-danger');
  }

  public setTextDangerForImportantPackage(
    firstPackage: string,
    packageName: string,
    secondPackage: string,
    cellId: string
  ) {
    const row = document.getElementById(cellId);
    if (row) {
      if (firstPackage === '(none)') {
        row.innerHTML = `<span class="text-danger">${firstPackage}</span> &#8594; <span>${secondPackage}</span>`;
      }
      else if (secondPackage === '(none)') {
        row.innerHTML = `<span>${firstPackage}</span> &#8594; <span class="text-danger">${secondPackage}</span>`;
      }
    }
  }

  public checkPackageVersion(
    packageName: string,
    packageVersion: string,
    recommendVersion: string,
  ) {
    const newElement = document.createElement('span');
    const text = document.createTextNode(packageVersion);
    newElement.appendChild(text);

    if (!recommendVersion) {
      return `<span>${packageVersion}</span>`;
    }

    try {
      if (semver.lt(packageVersion, recommendVersion)) {
        return `<span class="text-danger">${packageVersion}</span>`;
      }
      return `<span>${packageVersion}</span>`;
    } catch (err) {
      return `<span class="text-danger">${packageVersion}</span>`;
    }
  }

  public getPackageData(
    packageName: string,
    firstPackage: string,
    secondPackage: string,
    recommendVersion: string,
    isImportant: boolean,
    cellId: string,
    rowId: string
  ) {
    if (!firstPackage && !secondPackage) {
      if (isImportant) {
        this.setRowBefore('before_danger', rowId);
        this.setRowBgDanger(cellId);
      }
      return '(none)';
    }
    else if (firstPackage === secondPackage) {
      const cell = document.getElementById(cellId);
      cell.innerHTML = this.checkPackageVersion(packageName, firstPackage, recommendVersion);
    }
    else if (!firstPackage) {
      if (isImportant) {
        this.setTextDangerForImportantPackage('(none)', packageName, secondPackage, cellId);
      } else {
        const cell = document.getElementById(cellId);
        cell.innerHTML = `<span>(none)</span> &#8594; 
          ${this.checkPackageVersion(
            packageName, 
            secondPackage, 
            recommendVersion
          )}`;
      }
    }
    else if (!secondPackage) {
      if (isImportant) {
        this.setTextDangerForImportantPackage(firstPackage, packageName, '(none)', cellId);
      } else {
        const cell = document.getElementById(cellId);
        cell.innerHTML = `${this.checkPackageVersion(
          packageName,
          firstPackage,
          recommendVersion,
        )} &#8594; <span>(none)</span>`;
      }
    }
    else {
      const cell = document.getElementById(cellId);
      cell.innerHTML = `
        ${this.checkPackageVersion(
          packageName, 
          firstPackage, 
          recommendVersion,
        )} 
        &#8594; 
        ${this.checkPackageVersion(
          packageName, 
          secondPackage, 
          recommendVersion,
        )}`;
    }
  }
}
