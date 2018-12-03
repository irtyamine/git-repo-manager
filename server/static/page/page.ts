import { Component, OnInit } from '@angular/core';
import { GetRepositoriesService } from './services/get.repositories.service';
import gitHubConfig from '../../../config/github.repositories';
import compareVersions from 'compare-versions';

@Component({
  selector: 'page',
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
