import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { SortDataService } from '../services/sort.data.service';
import versions from '../config/versions.config';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})
export class MainpageComponent implements OnInit {
  constructor(private app: AppService, private sortData: SortDataService) {}

  public reposData: any = [];
  public ver = versions;

  ngOnInit() {
    this.getReposData();
  }

  public getReposData() {
    return this.app.getData().subscribe(res => {
      this.reposData = this.sortData.sortReposData(res);
    });
  }

  public setVersion(version) {
    if (version !== 'undefined' && version) {
      return version.replace(/[^]*([\0-9].[\0-9].[\0-9])/, '$1');
    }
  }
}
