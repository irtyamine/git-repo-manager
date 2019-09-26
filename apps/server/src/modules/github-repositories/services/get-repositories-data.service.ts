import { Injectable } from '@nestjs/common';
import { LayerService } from './layer.service';

@Injectable()
export class GetRepositoriesDataService {

  constructor(
    private readonly repositoryLayer: LayerService
  ) {  }

  public async getRepositories(organizationName: string, dataSource: string) {
    return await this.repositoryLayer.getRepositories(organizationName, dataSource);
  }

}
