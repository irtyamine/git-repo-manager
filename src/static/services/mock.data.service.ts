import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { GetRepositoriesService } from './get.repositories.service';

@Injectable({
  providedIn: 'root'
})

export class MockDataService extends DataService {

  constructor(protected service: GetRepositoriesService, protected router: Router) {
    super(service, router);
  }

  public getReposData(param) {
    return super.getReposData(param);
  }
}
