import { Controller, Get, Post, Put, Delete, Body, Req } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesInterface } from './packages.interface';

@Controller('repositories3')
export class PackagesController {
    constructor(private service: PackagesService) {  }

    @Get('all-packages')
    getAllPackages() {
        return this.service.getPackages();
    }

    @Get('recommend-versions')
    detRecommendVersions() {
        return this.service.getRecommendPackagesVersions();
    }

    @Get('new-package')
    getPackage(@Req() req) {
        return this.service.findPackage(req.query.newDependency);
    }

    @Get('new-recommend-version')
    getNewVersions(@Req() req) {
      return this.service.getRecommendVersionsForNewPackage(req.query.dependencyName);
    }

    @Post('insert-package')
    async insertNewPackage(@Body() body: PackagesInterface) {
        await this.service.insertNewPackage(body);
        return this.service.getPackages();
    }

    @Put('update-version')
    updateRecommendVersion(@Body() body) {
        this.service.updateRecommendVersion(body);
    }

    @Delete('delete-dependency')
    deleteDependency(@Req() req) {
        this.service.deleteDependency(req.query.dependency);
    }
}
