"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const repositories_repository_1 = require("./repositories.repository");
const config_service_1 = require("../../config/config.service");
const cron_1 = require("cron");
let GitHubRepositoriesService = class GitHubRepositoriesService {
    constructor(httpService, repoDB, configFile) {
        this.httpService = httpService;
        this.repoDB = repoDB;
        this.configFile = configFile;
        this.updateTime();
    }
    updateTime() {
        new cron_1.CronJob('00 00 11 * * 1-5', () => {
            this.makeRequestToGitHubLink();
        }, null, true, 'Europe/Kiev');
    }
    getNamesFromDB() {
        let arrayOfRepositoriesNames = [];
        for (let repository of this.configFile.config.repositories) {
            const initialRepositoriesObject = {
                repoName: repository.name,
                repoType: repository.repoType
            };
            arrayOfRepositoriesNames.push(initialRepositoriesObject);
            this.repoDB.firsInsertToDB(initialRepositoriesObject, initialRepositoriesObject.repoName);
        }
        return arrayOfRepositoriesNames;
    }
    makeRequestToGitHubLink() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let repository of this.configFile.config.repositories) {
                const branch = {}, masterSearch = yield this.createGithubLinkAndGetDataFromGitHub(repository, {}, branch, 'master'), developmentSearch = yield this.createGithubLinkAndGetDataFromGitHub(repository, {}, branch, 'development'), repositoryData = lodash_1.assign({}, masterSearch, developmentSearch);
                this.repoDB.insertToDB(repositoryData);
                this.countUpdatedRepositories(this.configFile.config.repositories.indexOf(repository) + 1);
            }
        });
    }
    countUpdatedRepositories(count) {
        console.log(count);
    }
    createGithubLinkAndGetDataFromGitHub(repositoryData, dataObject, branchObject, branchAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let branch of this.configFile.config.aliasesOfBranch[branchAlias]) {
                const link = `https://raw.githubusercontent.com/${repositoryData.name}/${branch}/package.json`, gitHubData = yield this.getRepositoryData(link, repositoryData.token);
                if (lodash_1.keys(gitHubData).length === 0)
                    break;
                const branches = { [branchAlias]: gitHubData };
                lodash_1.assign(branchObject, branches);
                const repository = {
                    repoName: repositoryData.name,
                    repoType: repositoryData.repoType,
                    timestamp: Date.now(),
                    branches: branchObject
                };
                lodash_1.assign(dataObject, repository);
            }
            return dataObject;
        });
    }
    getRepositoryData(route, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                headers: {
                    Authorization: accessToken
                }
            };
            const resultData = {};
            yield this.httpService
                .get(route, config)
                .toPromise()
                .then(result => {
                const dependencies = lodash_1.assign({}, result.data.devDependencies, result.data.dependencies);
                const staticRepoData = lodash_1.pick(result.data, [
                    this.configFile.config.staticRepoData.version,
                    this.configFile.config.staticRepoData.name,
                    this.configFile.config.staticRepoData.description
                ]);
                const dependenciesRepo = lodash_1.pick(dependencies, [
                    this.configFile.config.objectPackages.express,
                    this.configFile.config.objectPackages.lodash,
                    this.configFile.config.objectPackages.tslint,
                    this.configFile.config.objectPackages.typescript,
                    this.configFile.config.objectPackages.angular
                ]);
                lodash_1.assign(resultData, staticRepoData, dependenciesRepo);
            })
                .catch(error => {
                if (error.response.status === 404) {
                    return null;
                }
                else {
                    throw error;
                }
            });
            return resultData;
        });
    }
    findAllDataAtDatabase(parameter) {
        return this.repoDB.findRepositoriesData(parameter);
    }
};
GitHubRepositoriesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService,
        repositories_repository_1.GitHubRepositoriesRepository,
        config_service_1.ConfigService])
], GitHubRepositoriesService);
exports.GitHubRepositoriesService = GitHubRepositoriesService;
//# sourceMappingURL=repositories.service.js.map