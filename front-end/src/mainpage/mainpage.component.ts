import { Component, OnInit } from '@angular/core';
import { RepositoriesService } from '../services/repositories.service';
import gitHubConfig from '../../../helpers/github.repositories';
import compareVersions from 'compare-versions';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})
export class MainpageComponent implements OnInit {
  constructor(private repository: RepositoriesService) {}

  public repositories = [];
  public packagesVersions = gitHubConfig.recommendedAtValorVersions;
  public condition = true;

  ngOnInit() {
    this.repository.getAllRepositories().subscribe(res => {
      this.repositories = res;
    });
  }

  public getReposData() {
    this.condition = false;
    return this.repository.getData().subscribe(res => {
      this.condition = true;
      this.repositories = res;
    });
  }

  public lastUpdateTime(timestamp) {
    const lastTimeOfUpdate = Date.now() - timestamp;
    const seconds = Math.round(lastTimeOfUpdate / 1000),
      minutes = Math.round(lastTimeOfUpdate / (1000 * 60)),
      hours = Math.round(lastTimeOfUpdate / (1000 * 60 * 60)),
      days = Math.round(lastTimeOfUpdate / (1000 * 60 * 60 * 24));

    return seconds < 60
      ? seconds + ' sec'
      : minutes < 60
      ? minutes + ' min'
      : hours < 24
      ? hours + ' hrs'
      : days + ' days';
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
