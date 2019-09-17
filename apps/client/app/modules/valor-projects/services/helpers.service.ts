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

  public setTextDangerForPackageImportant(firstPackage: string, packageName: string, secondPackage: string, cellId: string) {

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

  public checkPackageVersion(packageName: string, firstPacage: string, recommend: string, rowId: string) {
    if (packageName === 'name' || packageName === 'version' || packageName === 'description') {
      return `<span>${firstPacage}</span>`;
    }
    if (semver.lt(firstPacage, '4.16.10')) {
      return `<span class="text-danger">${firstPacage}</span>`;
    }
    return `<span>${firstPacage}</span>`;
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
        this.setRowBgDanger(cellId);
      }
      return '(none)';
    }
    else if (firstPackage === secondPackage) {
      const row = document.getElementById(cellId);
      row.innerHTML = this.checkPackageVersion(packageName, firstPackage, recommendVersion, rowId);
    }
    else if (!firstPackage) {
      if (isImportant) {
        this.setTextDangerForPackageImportant('(none)', packageName, secondPackage, cellId);
      }

      const row = document.getElementById(cellId);
      row.innerHTML = `<span>(none)</span> &#8594; ${this.checkPackageVersion(packageName, secondPackage, recommendVersion, rowId)}`;
    }
    else if (!secondPackage) {
      if (isImportant) {
        this.setTextDangerForPackageImportant(firstPackage, packageName, '(none)', cellId);
      }

      const row = document.getElementById(cellId);
      row.innerHTML = `${this.checkPackageVersion(packageName, firstPackage, recommendVersion, rowId)} &#8594; <span>(none)</span>`;
    }

    return `${firstPackage} \u2192 ${secondPackage}`;
  }
}
