import { Injectable } from '@nestjs/common';
import { LayerService } from './layer.service';
import { RequestQuery } from '../../../interfaces/reques-query.interface';

@Injectable()
export class GetRepositoriesDataService {

  constructor(
    private readonly repositoryLayer: LayerService
  ) {  }

  public async getRepositories(query: RequestQuery) {
    return await this.repositoryLayer.getRepositories(query.organization, query.dataSource);
  }

}
