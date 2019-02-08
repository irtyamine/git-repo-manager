import { Component, OnInit } from '@angular/core';
import { GetRepositoriesService } from '../services/get.repositories.service';
import { DataService } from '../services/data.service';
import { Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as compareVersions from 'compare-versions';

@Component({
  selector: 'app-page',
  templateUrl: './page.html',
  styleUrls: ['./page.css'],
})

export class Page implements OnInit {

  private keyUp = new Subject<any>();
  public repositoriesData: any;
  public packagesVersions: any;

  constructor(
    private repository: GetRepositoriesService,
    private repositoriesDataService: DataService
  ) {
    this.packagesVersions = this.repository.getConfigurationFile.recommendedAtValorVersions;
    this.keyUp
      .pipe(
        map(event => {
          const version = event.event.target.value;
          const packageName = event.pack;
          return { version, packageName };
        }),
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(text => {
      this.repositoriesDataService.filterByPackages(text);
      });
  }

  ngOnInit() {
    this.repositoriesData = this.repositoriesDataService.subject;
  }

  public filtration(packageName: string, event: any) {
    this.keyUp.next({ event: event, pack: packageName });
  }

  public filterByPrivacy(value: string) {
    this.repositoriesDataService.filterByPrivacyAndBranches(value);
  }

  public filterBranches(value: string) {
    this.repositoriesDataService.filterByPrivacyAndBranches(value);
  }

  public getDataFromObject(branch, packageName) {
    if (branch) return branch[packageName];
  }

  public lastUpdate(time) {
    let milliseconds = Date.now() - time,
      seconds = Math.floor(milliseconds / 1000),
      minutes = Math.floor(milliseconds / (1000 * 60)),
      hours = Math.floor(milliseconds / (1000 * 60 * 60)),
      days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)),
      result = '';

    seconds < 60 ? result += seconds + ' sec'
      : minutes < 60 ? result += minutes + ' min'
      : hours < 24 ? result += hours + ' hrs' : result += days + ' d';
    return result;
  }

  public setVersion(version, configVersion) {
    if (!!version && version) {
      return (
        compareVersions(
          version.replace(/[^]*[~]*([0-9].[0-9].[0-9])/, '$1'),
          configVersion,
        ) === -1
      );
    }
  }
}
