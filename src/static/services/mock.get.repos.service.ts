import { Injectable } from '@angular/core';
import { GetRepositoriesService } from './get.repositories.service';

@Injectable({
  providedIn: 'root'
})

export class MockGetReposService extends GetRepositoriesService{  }