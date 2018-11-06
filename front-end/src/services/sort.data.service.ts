import { Injectable } from '@angular/core';
import { forEach } from 'lodash';

@Injectable()
export class SortDataService {
  private ReposData: any = [];

  sortReposData(data) {
    const RepoDataArray = [];
    forEach(data, item => {
      const masterLength = Object.keys(item.master).length;
      const developLength = Object.keys(item.develop).length;
      const developmentLength = Object.keys(item.development).length;
      if (
        masterLength === 1 &&
        developLength === 1 &&
        developmentLength === 1
      ) {
        const newObj = {
          repoName: item.repoName,
          timestamp: item.timestamp,
          err: `There aren't any branches in '${item.repoName}' repository`,
        };
        return RepoDataArray.push(newObj);
      } else if (developLength === 1 && developmentLength === 1) {
        const newObj = {
          repoName: item.repoName,
          timestamp: item.timestamp,
          master: item.master,
          err: `There isn't 'development' branch in '${
            item.repoName
          }' repository`,
        };
        return RepoDataArray.push(newObj);
      } else if (masterLength === 1 && developLength === 1) {
        const newObj = {
          repoName: item.repoName,
          timestamp: item.timestamp,
          dev: item.development,
          err: `There isn't 'master' branch in '${item.repoName}' repository`,
        };
        return RepoDataArray.push(newObj);
      } else if (masterLength === 1 && developmentLength === 1) {
        const newObj = {
          repoName: item.repoName,
          timestamp: item.timestamp,
          dev: item.develop,
          err: `There isn't 'master' branch in '${item.repoName}' repository`,
        };
        return RepoDataArray.push(newObj);
      } else if (developLength === 1) {
        const newObj = {
          repoName: item.repoName,
          timestamp: item.timestamp,
          master: item.master,
          dev: item.development,
          err: '',
        };
        return RepoDataArray.push(newObj);
      } else if (developmentLength === 1) {
        const newObj = {
          repoName: item.repoName,
          timestamp: item.timestamp,
          master: item.master,
          dev: item.develop,
          err: '',
        };
        return RepoDataArray.push(newObj);
      }
    });
    return (this.ReposData = RepoDataArray);
  }
}
