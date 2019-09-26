import { Injectable } from '@nestjs/common';
import { LayerService } from './layer.service';

@Injectable()
export class PackagesService {

  constructor(
    private readonly repositoriesLayer: LayerService
  ) {  }

  public async getPackages() {
      return await this.repositoriesLayer.getPackages('valor-software', 'github');
  }

}
