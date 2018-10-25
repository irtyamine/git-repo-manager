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

  private repos_data: any = [];
  public ver = versions;

  ngOnInit() {}

  getRData() {
    return this.app.getData()
      .subscribe(res => {
        console.log(res);
        const repo_data_array = [];
        _.forEach(res, (item) => {
          if(item.develop === undefined && item.development === undefined) {
            const newObj = {
              repo_name: item.repo_name,
              timestamp: item.timestamp,
              master: item.master,
              err: `There isn't 'development' branch in '${item.repo_name}' repository`
            };
            return repo_data_array.push(newObj);
          } else if(item.develop === undefined) {
            const newObj = {
              repo_name: item.repo_name,
              timestamp: item.timestamp,
              master: item.master,
              dev: item.development,
              err: "",
            };
            return repo_data_array.push(newObj);
          } else if(item.development === undefined) {
            const newObj = {
              repo_name: item.repo_name,
              timestamp: item.timestamp,
              master: item.master,
              dev: item.develop,
              err: ""
            };
            return repo_data_array.push(newObj);
          }
        });
        this.repos_data = repo_data_array;
      })
  }

  s(d) {
    if(d !== 'undefined' && d) {
      return d.replace(/[^]*([\0-9].[\0-9].[\0-9])/, '$1');
    }
  }
}
