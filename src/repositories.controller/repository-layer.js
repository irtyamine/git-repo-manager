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
const mongoose_1 = require("mongoose");
let GitHubRepositoriesRepositoryLayer = class GitHubRepositoriesRepositoryLayer {
    constructor(repoModel, updateRepoModel) {
        this.repoModel = repoModel;
        this.updateRepoModel = updateRepoModel;
    }
    insertReposNamesToDB(item, parameter) {
        let newRepositoryObject = new this.repoModel(item);
        this.repoModel.findOneAndUpdate({ repoName: parameter }, { $set: newRepositoryObject }, { upsert: true }, (err, res) => {
            if (err)
                throw err;
        });
    }
    updateSingleRepository(data) {
        const newDataObject = new this.updateRepoModel(data);
        this.updateRepoModel.findOneAndUpdate({ repoName: newDataObject.repoName, addedBy: newDataObject.addedBy }, { $set: newDataObject }, { upsert: true }, (err, res) => {
            if (err)
                throw err;
        });
    }
    deleteRepository(repoName, addedBy) {
        this.updateRepoModel.deleteMany({ $and: [{ $or: [{ repoName: repoName }, { addedBy: addedBy }] }] }, (err) => { });
    }
    setBranchesToDefault(repoName, userLogin) {
        return this.updateRepoModel.deleteOne({ repoName: repoName, addedBy: userLogin }, (err) => { });
    }
    insertSingleRepositoryToDB(item) {
        let repositoryObject = new this.repoModel(item);
        this.repoModel.findOneAndUpdate({ repoName: repositoryObject.repoName }, { $set: repositoryObject }, { upsert: true }, (err, res) => {
            if (err)
                throw err;
        });
    }
    findRepositoriesNames() {
        return this.repoModel.find({ repoName: { $ne: null } }).select({ 'repoName': 1, '_id': 0 });
    }
    getRepositoryNameAndTypeToUpdate() {
        return this.repoModel.find({ repoName: { $ne: null } }).select({ 'repoName': 1, 'repoType': 1, '_id': 0 });
    }
    findRepositoryData(parameter, userLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultRepo = yield this.repoModel.findOne({ repoName: parameter, branches: { $exists: true } }).select({ '_id': 0 });
            if (!!defaultRepo) {
                const customRepos = yield this.updateRepoModel.findOne({ repoName: defaultRepo.repoName, addedBy: userLogin, branches: { $exists: true } });
                if (!customRepos) {
                    return defaultRepo;
                }
                else {
                    return customRepos;
                }
            }
        });
    }
    getAllRepos(userLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            const customRepos = yield this.updateRepoModel.find({ addedBy: userLogin, branches: { $exists: true } });
            const defaultRepos = yield this.repoModel.find({ repoName: { $ne: null }, branches: { $exists: true } });
            for (let customRepo of customRepos) {
                for (let defRepo of defaultRepos) {
                    if (customRepo.repoName === defRepo.repoName) {
                        defaultRepos.splice(defaultRepos.indexOf(defRepo), 1, customRepo);
                    }
                }
            }
            return defaultRepos;
        });
    }
};
GitHubRepositoriesRepositoryLayer = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('RepoModelToken')),
    __param(1, common_1.Inject('CustomRepoModelToken')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], GitHubRepositoriesRepositoryLayer);
exports.GitHubRepositoriesRepositoryLayer = GitHubRepositoriesRepositoryLayer;
