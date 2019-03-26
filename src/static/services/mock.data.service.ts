import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { GetRepositoriesService } from './get.repositories.service';

@Injectable({
  providedIn: 'root'
})

export class MockDataService extends DataService {

  constructor(protected service: GetRepositoriesService) {
    super(service);
  }

  public getReposData(param) {
    return super.getReposData(param);
  }
}
