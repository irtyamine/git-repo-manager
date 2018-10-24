import { Document } from 'mongoose';

export interface Repo extends Document{
    readonly repo_name: string,
    readonly timestamp: string,
    readonly master: {
        readonly version: string,
        readonly name: string,
        readonly description: string,
        readonly express: string,
        readonly lodash: string,
        readonly tslint: string,
        readonly typescript: string,
        readonly '@angular/common': string
    },
    readonly develop: {
        readonly version: string,
        readonly name: string,
        readonly description: string,
        readonly express: string,
        readonly lodash: string,
        readonly tslint: string,
        readonly typescript: string,
        readonly '@angular/common': string
    },
    readonly development: {
        readonly version: string,
        readonly name: string,
        readonly description: string,
        readonly express: string,
        readonly lodash: string,
        readonly tslint: string,
        readonly typescript: string,
        readonly '@angular/common': string
    }
}