import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { AppService } from '../../services/app.service';
import versions from '../../config/versions.config';

@Component({
  selector: 'app-repo.info',
  templateUrl: './repo.info.component.html',
  styleUrls: ['./repo.info.component.css']
})
export class RepoInfoComponent implements OnInit {

  private repos_data: any = [];
  public ver = versions;
  private repository_name: any;
  public condition: boolean;

  constructor(private route: ActivatedRoute, private app: AppService) {
  }

  ngOnInit() {
    return this.app.getData()
      .subscribe(res => {
        const repo_data_array = [];
        _.forEach(res, (item) => {
          if (item.develop === undefined && item.development === undefined) {
            const newObj = {
              repo_name: item.repo_name,
              timestamp: item.timestamp,
              master: item.master,
              err: `There isn't 'development' branch in '${item.repo_name}' repository`
            };
            return repo_data_array.push(newObj);
          } else if (item.develop === undefined) {
            const newObj = {
              repo_name: item.repo_name,
              timestamp: item.timestamp,
              master: item.master,
              dev: item.development,
              err: "",
            };
            return repo_data_array.push(newObj);
          } else if (item.development === undefined) {
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
        this.route.params.subscribe(params => {
          this.repository_name = params;
          const arr = this.repos_data;
          _.forEach(arr, (arr_item) => {
            if(arr_item.repo_name === this.repository_name.name) {
              this.condition = true;
              return this.condition;
            }
          })
        });
      });
  }

  s(d) {
    if(d !== 'undefined' && d) {
      return d.replace(/[^]*([\0-9].[\0-9].[\0-9])/, '$1');
    }
  }

}
