import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import * as _ from 'lodash';
import  versions  from '../config/versions.config';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor(private app: AppService) {  }

  private reposData: any = [];
  public ver = versions;

  ngOnInit() {}

  getRData() {
    return this.app.getData()
      .subscribe(res => {
        console.log(res);
        const repoDataArray = [];
        _.forEach(res, (item) => {
          if(item.master === undefined && item.develop === undefined && item.development === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              err: `There aren't any branches in '${item.repoName}' repository`
            };
            return repoDataArray.push(newObj);
          } else if(item.develop === undefined && item.development === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              master: item.master,
              err: `There isn't 'development' branch in '${item.repoName}' repository`
            };
            return repoDataArray.push(newObj);
          } else if(item.master === undefined && item.develop === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              dev: item.development,
              err: `There isn't 'master' branch in '${item.repoName}' repository`
            };
            return repoDataArray.push(newObj);
          } else if(item.master === undefined && item.development === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              dev: item.develop,
              err: `There isn't 'master' branch in '${item.repoName}' repository`
            };
            return repoDataArray.push(newObj);
          } else if(item.develop === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              master: item.master,
              dev: item.development,
              err: "",
            };
            return repoDataArray.push(newObj);
          } else if(item.development === undefined) {
            const newObj = {
              repoName: item.repoName,
              timestamp: item.timestamp,
              master: item.master,
              dev: item.develop,
              err: ""
            };
            return repoDataArray.push(newObj);
          }
        });
        this.reposData = repoDataArray;
      })
  }

  s(d) {
    if(d !== 'undefined' && d) {
      return d.replace(/[^]*([\0-9].[\0-9].[\0-9])/, '$1');
    }
  }
}
