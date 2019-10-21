import { Injectable } from '@nestjs/common';
import { LayerService } from './layer.service';
import { RequestQuery } from '../../../interfaces/reques-query.interface';

@Injectable()
export class PackagesService {

  constructor(
    private readonly repositoriesLayer: LayerService
  ) {  }

  public async getPackages(params: RequestQuery) {
      return await this.repositoriesLayer.getPackages(params.organization, params.dataSource);
  }

}
