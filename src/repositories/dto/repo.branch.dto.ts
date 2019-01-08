import { RepoBranch } from '../interfaces/repoBranch';

export class RepoBranchDto implements RepoBranch {
    version: string;
    name: string;
    description: string;
    express: string;
    lodash: string;
    tslint: string;
    typescript: string;
    '@angular/common': string;
}
