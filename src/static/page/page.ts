import { Component, OnInit } from '@angular/core';
import { GetRepositoriesService } from '../services/get.repositories.service';
import gitHubConfig from '../../../config/github.repositories';
import * as compareVersions from 'compare-versions';

@Component({
  selector: 'app-page',
  templateUrl: './page.html',
  styleUrls: ['./page.css'],
})

export class Page implements OnInit {
  constructor(private repository: GetRepositoriesService) {}

  public repositories = [];
  public packagesVersions = gitHubConfig.recommendedAtValorVersions;
  public condition = true;

  ngOnInit() {
    this.repository.getAllRepositories().subscribe(res => {
      console.log(res);
      this.repositories = res;
    });
  }

  public lastUpdate(time) {
    let milliseconds = Date.now() - time;
    let seconds = Math.floor(milliseconds / 1000),
        minutes = Math.floor(milliseconds / (1000 * 60)),
        hours = Math.floor(milliseconds / (1000 * 60 * 60)),
        days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    if (seconds < 60) {
      return seconds + ' sec';
    } else if (minutes < 60) {
      return minutes + ' min';
    } else if (hours < 24) {
      return hours + ' hrs';
    } else {
      return days + ' d';
    }
  }

  public getReposData() {
    this.condition = false;
    return this.repository.getData().subscribe(res => {
      this.condition = true;
      this.repositories = res;
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
