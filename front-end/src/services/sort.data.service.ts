import { Injectable } from '@angular/core';
import { forEach } from 'lodash';

@Injectable()
export class SortDataService {
  private ReposData: any = [];

  sortReposData(data) {
    const RepoDataArray = [];
    forEach(data, item => {
      if (
        item.master === undefined &&
        item.develop === undefined &&
        item.development === undefined
      ) {
        const newObj = {
          repoName: item.repoName,
          timestamp: item.timestamp,
          err: `There aren't any branches in '${item.repoName}' repository`,
        };
        return RepoDataArray.push(newObj);
      } else if (item.develop === undefined && item.development === undefined) {
        const newObj = {
          repoName: item.repoName,
          timestamp: item.timestamp,
          master: item.master,
          err: `There isn't 'development' branch in '${
            item.repoName
          }' repository`,
        };
        return RepoDataArray.push(newObj);
      } else if (item.master === undefined && item.develop === undefined) {
        const newObj = {
          repoName: item.repoName,
          timestamp: item.timestamp,
          dev: item.development,
          err: `There isn't 'master' branch in '${item.repoName}' repository`,
        };
        return RepoDataArray.push(newObj);
      } else if (item.master === undefined && item.development === undefined) {
        const newObj = {
          repoName: item.repoName,
          timestamp: item.timestamp,
          dev: item.develop,
          err: `There isn't 'master' branch in '${item.repoName}' repository`,
        };
        return RepoDataArray.push(newObj);
      } else if (item.develop === undefined) {
        const newObj = {
          repoName: item.repoName,
          timestamp: item.timestamp,
          master: item.master,
          dev: item.development,
          err: '',
        };
        return RepoDataArray.push(newObj);
      } else if (item.development === undefined) {
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
/*  sortReposData(data) {
    const RepoDataArray = [];
    forEach(data, item => {
      console.log(item.develop);
      switch (item) {
        case item.master === undefined && item.develop === undefined && item.development === undefined:
          RepoDataArray.push({
            repoName: item.repoName,
            timestamp: item.timestamp,
            err: `There aren't any branches in '${item.repoName}' repository`
          });
          break;

        case item.develop === undefined && item.development === undefined:
          RepoDataArray.push({
            repoName: item.repoName,
            timestamp: item.timestamp,
            master: item.master,
            err: `There isn't 'development' branch in '${
              item.repoName
              }' repository`,
          });
          break;

        case item.master === undefined && item.develop === undefined:
          RepoDataArray.push({
            repoName: item.repoName,
            timestamp: item.timestamp,
            dev: item.development,
            err: `There isn't 'master' branch in '${item.repoName}' repository`
          });
          break;

        case item.master === undefined && item.development === undefined:
          RepoDataArray.push({
            repoName: item.repoName,
            timestamp: item.timestamp,
            dev: item.develop,
            err: `There isn't 'master' branch in '${item.repoName}' repository`
          });
          break;

        case item.develop === undefined:
          RepoDataArray.push({
            repoName: item.repoName,
            timestamp: item.timestamp,
            master: item.master,
            dev: item.development,
            err: ''
          });
          break;

        case item.development === undefined:
          RepoDataArray.push({
            repoName: item.repoName,
            timestamp: item.timestamp,
            master: item.master,
            dev: item.develop,
            err: ''
          });
          break;
      }
    });
    console.log(1111, RepoDataArray);
    return (this.ReposData = RepoDataArray);
  }*/
}
