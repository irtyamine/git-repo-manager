import * as mongoose from 'mongoose';

export const RepoDataSchema = new mongoose.Schema({
    repo_name: {
        type: String
    },
    timestamp: {
        type: String
    },
    master: {
        version: String,
        name: String,
        description: String,
        express: String,
        lodash: String,
        tslint: String,
        typescript: String,
        '@angular/common': String
    },
    develop: {
        version: String,
        name: String,
        description: String,
        express: String,
        lodash: String,
        tslint: String,
        typescript: String,
        '@angular/common': String
    },
    development: {
        version: String,
        name: String,
        description: String,
        express: String,
        lodash: String,
        tslint: String,
        typescript: String,
        '@angular/common': String
    }
});