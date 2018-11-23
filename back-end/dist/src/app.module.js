"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const repos_module_1 = require("./repos/repos.module");
const common_2 = require("@nestjs/common");
const database_providers_1 = require("./common/database.providers");
const repos_providers_1 = require("./repos/repos.providers");
const repos_service_1 = require("./repos/repos.service");
const repos_repository_1 = require("./repos/repos.repository");
const repos_controller_1 = require("./repos/repos.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        exports: [
            ...database_providers_1.databaseProviders,
            ...repos_providers_1.reposProviders
        ],
        imports: [
            common_2.HttpModule,
            repos_module_1.ReposModule
        ],
        controllers: [repos_controller_1.ReposController],
        providers: [
            repos_service_1.ReposService,
            repos_repository_1.ReposRepository,
            ...database_providers_1.databaseProviders,
            ...repos_providers_1.reposProviders
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map