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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let GitHubRepositoriesRepository = class GitHubRepositoriesRepository {
    constructor(repoModel) {
        this.repoModel = repoModel;
    }
    firsInsertToDB(item, parameter) {
        let newRepositoryObject = new this.repoModel(item);
        this.repoModel.findOneAndUpdate({ repoName: parameter }, { $set: newRepositoryObject }, { upsert: true }, (err, res) => {
            if (err)
                throw err;
        });
    }
    insertToDB(item) {
        let repositoryObject = new this.repoModel(item);
        this.repoModel.findOneAndUpdate({ repoName: repositoryObject.repoName }, { $set: repositoryObject }, { upsert: true }, (err, res) => {
            if (err)
                throw err;
        });
    }
    findRepositoriesData(parameter) {
        return this.repoModel.findOne({ repoName: parameter });
    }
};
GitHubRepositoriesRepository = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('RepoModelToken')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], GitHubRepositoriesRepository);
exports.GitHubRepositoriesRepository = GitHubRepositoriesRepository;
//# sourceMappingURL=repositories.repository.js.map