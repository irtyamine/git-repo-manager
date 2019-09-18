import { Injectable } from '@angular/core';
import * as semver from 'semver';

@Injectable()
export class HelpersService {

  public setRowBefore(className: string, rowId: string) {
    const row = document.getElementById(rowId);
    if (!row) {
      return null;
    }
    row.className = '';
    row.className = className;
  }

  public setbBgPublic(id: string) {
    const row = document.getElementById(id);
    row.className = 'public';
  }

  public setbBgPrivate(id: string) {
    const row = document.getElementById(id);
    row.className = 'private';
  }

  public setRowBgDanger(id: string) {
    const row = document.getElementById(id);
    row.className = 'row-danger';
  }

  public setTextDangerForPackageImportant(
    firstPackage: string,
    packageName: string,
    secondPackage: string,
    cellId: string
  ) {
    const row = document.getElementById(cellId);
    if (!row) {
      return null;
    }
    if (firstPackage === '(none)') {
      row.innerHTML = `<span class="text-danger">${firstPackage}</span> &#8594; <span>${secondPackage}</span>`;
    }
    else if (secondPackage === '(none)') {
      row.innerHTML = `<span>${firstPackage}</span> &#8594; <span class="text-danger">${secondPackage}</span>`;
    }
  }

  public checkPackageVersion(
    packageName: string,
    packageVersion: string,
    recommendVersion: string
  ) {
    if (
      packageName === 'name'
      || packageName === 'version'
      || packageName === 'description'
    ) {
      return `<span>${packageVersion}</span>`;
    }

    try {
      const checkedResult = semver.lt(packageVersion, recommendVersion);
      if (checkedResult) {
        return `<span class="text-danger">${packageVersion}</span>`;
      }
    } catch (err) {
      return `<span class="text-danger">${packageVersion}</span>`;
    }

    return `<span>${packageVersion}</span>`;
  }

  public getPackageData(
    packageName: string,
    firstPackage: string,
    secondPackage: string,
    recommendVersion: string,
    isImportant: boolean,
    cellId: string,
  ) {
    if (!firstPackage && !secondPackage) {
      if (isImportant) {
        this.setRowBgDanger(cellId);
      }
      return '(none)';
    }
    else if (firstPackage === secondPackage) {
      const row = document.getElementById(cellId);
      row.innerHTML = this.checkPackageVersion(
        packageName,
        firstPackage,
        recommendVersion
      );
    }
    else if (!firstPackage) {
      if (isImportant) {
        this.setTextDangerForPackageImportant(
          '(none)',
          packageName,
          secondPackage,
          cellId
        );
      } else {
        const row = document.getElementById(cellId);
        row.innerHTML = `<span>(none)</span> &#8594; 
        ${this.checkPackageVersion(
          packageName,
          secondPackage,
          recommendVersion
        )}`;
      }
    }
    else if (!secondPackage) {
      if (isImportant) {
        this.setTextDangerForPackageImportant(firstPackage, packageName, '(none)', cellId);
      } else {
        const row = document.getElementById(cellId);
        row.innerHTML = `${this.checkPackageVersion(
          packageName,
          firstPackage,
          recommendVersion
        )} &#8594; <span>(none)</span>`;
      }
    }
    else {
      const row = document.getElementById(cellId);
      row.innerHTML = `
      ${this.checkPackageVersion(
        packageName, 
        firstPackage, 
        recommendVersion
      )} 
      &#8594; 
      ${this.checkPackageVersion(
        packageName, 
        secondPackage, 
        recommendVersion
      )}`;
    }
  }
}
