import { Component, OnInit } from '@angular/core';
import { GetRepositoriesService } from '../services/get.repositories.service';
import * as compareVersions from 'compare-versions';
import { CronJob } from 'cron';

@Component({
  selector: 'app-page',
  templateUrl: './page.html',
  styleUrls: ['./page.css'],
})

export class Page implements OnInit {

  public requestStatus: boolean = false;
  public repositories = [];
  public repoNames: any;
  private config: any;
  public packagesVersions: any;

  constructor(private repository: GetRepositoriesService) {
     this.config = this.repository.getConfigurationFile();
     this.packagesVersions = this.config.recommendedAtValorVersions;
  }

  ngOnInit() {
    this.getRepositoriesNames();
  }

  public checkBranch(branchData, branchName) {
    if (branchData) {
      return branchName;
    } else {
      return '';
    }
  }

  public checkValue(branch, item) {
    if (branch) {
      if (!branch[item]) {
        return '(none)';
      } else {
        return branch[item];
      }
    } else {
      return '(none)';
    }
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

  private getRepositoriesNames() {
    return this.repository.getRepositoryNames()
      .subscribe(result => {
        this.repoNames = result;
        for (let element of this.repoNames) {
          this.getReposData(element.repoName);
        }
      });
  }

  private getReposData(param) {
    return this.repository.getAllRepositories(param).subscribe((res) => {
      console.log(res);
      this.repositories.push(res);
    });
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
