import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
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

    @Post('insert-package')
    insertNewPackage(@Body() body: PackagesInterface) {
        this.service.insertNewPackage(body);
        return this.service.getPackages();
    }
}
