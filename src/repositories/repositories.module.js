"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const repositories_service_1 = require("./repositories.service");
const repositories_repository_1 = require("./repositories.repository");
const repositories_providers_1 = require("./repositories.providers");
const database_providers_1 = require("../common/database.providers");
const repositories_controller_1 = require("./repositories.controller");
const config_service_1 = require("../../config/config.service");
let RepositoriesModule = class RepositoriesModule {
};
RepositoriesModule = __decorate([
    common_1.Module({
        controllers: [
            repositories_controller_1.RepositoriesController
        ],
        imports: [common_1.HttpModule],
        providers: [
            config_service_1.ConfigService,
            repositories_service_1.GitHubRepositoriesService,
            repositories_repository_1.GitHubRepositoriesRepository,
            ...repositories_providers_1.repositoriesProviders,
            ...database_providers_1.databaseProviders
        ]
    })
], RepositoriesModule);
exports.RepositoriesModule = RepositoriesModule;
//# sourceMappingURL=repositories.module.js.map