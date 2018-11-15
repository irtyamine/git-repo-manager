import * as mongoose from 'mongoose';
import { ReposChildSchema } from './repos.child.schema';

export const ReposParentSchema = new mongoose.Schema({
    repoName: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        required: false
    },
    repoType: {
        type: String,
        required: false
    },
    master: ReposChildSchema,
    develop: ReposChildSchema,
    development: ReposChildSchema
});
