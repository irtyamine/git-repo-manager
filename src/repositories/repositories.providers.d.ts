/// <reference path="../../node_modules/@types/mongoose/index.d.ts" />
import { Connection } from 'mongoose';
export declare const repositoriesProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<import("mongoose").Document, {}>;
    inject: string[];
}[];
