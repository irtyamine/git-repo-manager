export class CreateRepoDto {
    readonly repoName: string;
    readonly timestamp: string;
    readonly master: {
        readonly version: string,
        readonly name: string,
        readonly description: string,
        readonly express: string,
        readonly lodash: string,
        readonly tslint: string,
        readonly typescript: string,
        readonly '@angular/common': string
    };
    readonly develop: {
        readonly version: string,
        readonly name: string,
        readonly description: string,
        readonly express: string,
        readonly lodash: string,
        readonly tslint: string,
        readonly typescript: string,
        readonly '@angular/common': string
    };
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