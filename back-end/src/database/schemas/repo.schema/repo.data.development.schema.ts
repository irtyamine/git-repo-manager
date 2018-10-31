export class RepoDataDevelopmentSchema {
    development: {
        version: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        express: {
            type: String,
            required: false
        },
        lodash: {
            type: String,
            required: false
        },
        tslint: {
            type: String,
            required: false
        },
        typescript: {
            type: String,
            required: false
        },
        '@angular/common': {
            type: String,
            required: false
        }
    }
};