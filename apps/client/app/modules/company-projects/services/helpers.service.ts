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

  public checkPackageVersion(
    pkgVersion: string,
    recommendVersion: string
  ) {

    if (!recommendVersion) {
      return `<span class="text-white">${ pkgVersion }</span>`;
    }

    try {
      const checkResult = semver.lt(pkgVersion, recommendVersion);

      if (checkResult) {
        return `<span class="text-danger">${ pkgVersion }</span>`;
      }

      return `<span class="text-white">${ pkgVersion }</span>`;
    }
    catch (err) {
      return `<span class="text-danger">${ pkgVersion }</span>`;
    }
  }


  public getDependencies(data: {
    base: string;
    compare: string;
    isImportant: boolean;
    minVersion: string;
    rowId: string;
    id: string;
  }) {
    const { base, compare, isImportant, minVersion, rowId, id } = data;
    const doc = document.getElementById(id);

    if (
      (!base && !compare)
      || (base === 'N/A' && !compare)
      || (!base && compare === 'N/A')
    ) {
      if (isImportant) {
        this.setRowBgDanger(id);
        this.setRowBefore('before_danger', rowId)
      }

      return doc.innerHTML = '<span class="text-white">N/A</span>'
    }

    if (base === compare) {
      return doc.innerHTML = this.checkPackageVersion(base, minVersion);
    }

    if (!base && compare) {
      if (isImportant) {
        return doc.innerHTML = `<span class="text-danger">N/A</span> &#8594; ${this.checkPackageVersion(compare, minVersion)}`
      }

      return doc.innerHTML = `<span class="text-white">N/A</span> &#8594; ${this.checkPackageVersion(compare, minVersion)}`
    }

    if (base && !compare) {
      if (isImportant) {
        return doc.innerHTML = `${this.checkPackageVersion(base, minVersion)} &#8594; <span class="text-danger">N/A</span>`
      }

      return doc.innerHTML = `${this.checkPackageVersion(base, minVersion)} &#8594; <span class="text-white">N/A</span>`;
    }

    if (base === 'N/A' && compare) {
      if (isImportant) {
        return doc.innerHTML = `<span class="text-danger">${base}</span> &#8594; ${this.checkPackageVersion(compare, minVersion)}`
      }

      return doc.innerHTML = `<span class="text-white">${base}</span> &#8594; ${this.checkPackageVersion(compare, minVersion)}`
    }

    if (base && compare === 'N/A') {
      if (isImportant) {
        return doc.innerHTML = `${this.checkPackageVersion(base, minVersion)} &#8594; <span class="text-danger">${compare}</span>`
      }

      return doc.innerHTML = `${this.checkPackageVersion(base, minVersion)} &#8594; <span class="text-white">${compare}</span>`;
    }

    return doc.innerHTML = `${this.checkPackageVersion(base, minVersion)} &#8594; ${this.checkPackageVersion(compare, minVersion)}`;
  }
}
