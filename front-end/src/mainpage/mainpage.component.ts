import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { forEach } from 'lodash';
import versions from '../config/versions.config';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor(private app: AppService) {  }

  private publicReposData: any = [];
  private privateReposData: any = [];
  public ver = versions;

  ngOnInit() {
    this.getRData();
  }

  public getRData() {
    return this.app.getData()
      .subscribe(res => {
        const publicRepoDataArray = [];
        const privateRepoDataArray = [];
        forEach(res.publicRepositories, (item) => {
          if (item.master === undefined && item.develop === undefined && item.development === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              err: `There aren't any branches in '${item.repoName}' repository`
            };
            return publicRepoDataArray.push(newObj);
          } else if (item.develop === undefined && item.development === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              master: item.master,
              err: `There isn't 'development' branch in '${item.repoName}' repository`
            };
            return publicRepoDataArray.push(newObj);
          } else if (item.master === undefined && item.develop === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              dev: item.development,
              err: `There isn't 'master' branch in '${item.repoName}' repository`
            };
            return publicRepoDataArray.push(newObj);
          } else if (item.master === undefined && item.development === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              dev: item.develop,
              err: `There isn't 'master' branch in '${item.repoName}' repository`
            };
            return publicRepoDataArray.push(newObj);
          } else if (item.develop === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              master: item.master,
              dev: item.development,
              err: "",
            };
            return publicRepoDataArray.push(newObj);
          } else if (item.development === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              master: item.master,
              dev: item.develop,
              err: ""
            };
            return publicRepoDataArray.push(newObj);
          }
        });
        this.publicReposData = publicRepoDataArray;

        forEach(res.privateRepositories, (item) => {
          if (item.master === undefined && item.develop === undefined && item.development === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              err: `There aren't any branches in '${item.repoName}' repository`
            };
            return privateRepoDataArray.push(newObj);
          } else if (item.develop === undefined && item.development === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              master: item.master,
              err: `There isn't 'development' branch in '${item.repoName}' repository`
            };
            return privateRepoDataArray.push(newObj);
          } else if (item.master === undefined && item.develop === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              dev: item.development,
              err: `There isn't 'master' branch in '${item.repoName}' repository`
            };
            return privateRepoDataArray.push(newObj);
          } else if (item.master === undefined && item.development === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              dev: item.develop,
              err: `There isn't 'master' branch in '${item.repoName}' repository`
            };
            return privateRepoDataArray.push(newObj);
          } else if (item.develop === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              master: item.master,
              dev: item.development,
              err: "",
            };
            return privateRepoDataArray.push(newObj);
          } else if (item.development === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              master: item.master,
              dev: item.develop,
              err: ""
            };
            return privateRepoDataArray.push(newObj);
          }
        });
        this.privateReposData = privateRepoDataArray;
      })
  }

  public setVersion(version) {
    if(version !== 'undefined' && version) {
      return version.replace(/[^]*([\0-9].[\0-9].[\0-9])/, '$1');
    }
  }
}
