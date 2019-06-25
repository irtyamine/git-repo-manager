import { Controller, Get, Post, Put, Delete, Body, Req } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesInterface } from './packages.interface';

@Controller('repositories3')
export class PackagesController {
    constructor(private service: PackagesService) {  }

    @Get('all-packages')
    getAllPackages(@Req() req) {
        return this.service.getPackages(req.cookies['_auth_token']);
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
    async insertNewPackage(@Req() req, @Body() body: PackagesInterface) {
        await this.service.insertNewPackage(body, req.cookies['_auth_token']);
        return this.service.getPackages(req.cookies['_auth_token']);
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
