import { Document } from 'mongoose';
export interface BaseInterface extends Document {
    readonly version: string;
    readonly name: string;
    readonly description: string;
    readonly express: string;
    readonly lodash: string;
    readonly tslint: string;
    readonly typescript: string;
    readonly '@angular/common': string;
}
