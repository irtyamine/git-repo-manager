"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const repos_controller_1 = require("./repos.controller");
const repos_service_1 = require("./repos.service");
const repos_repository_1 = require("./repos.repository");
const repos_providers_1 = require("./repos.providers");
const database_providers_1 = require("../common/database.providers");
const logger_middleware_1 = require("../common/logger.middleware");
let ReposModule = class ReposModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .with('ReposModule', 'GET')
            .exclude({ path: 'repository', method: common_1.RequestMethod.ALL })
            .forRoutes('/');
    }
};
ReposModule = __decorate([
    common_1.Module({
        controllers: [repos_controller_1.RepositoriesController],
        imports: [common_1.HttpModule],
        providers: [
            repos_service_1.GitHubRepositoriesService,
            repos_repository_1.GitHubRepositoriesRepository,
            ...repos_providers_1.reposProviders,
            ...database_providers_1.databaseProviders
        ]
    })
], ReposModule);
exports.ReposModule = ReposModule;
//# sourceMappingURL=repos.module.js.map