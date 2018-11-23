import * as mongoose from 'mongoose';
import { RepoBranchSchema } from './repo.branch.schema';

export const RepoSchema = new mongoose.Schema({
    repoName: {
        type: String,
        required: false
    },
    timestamp: {
        type: Number,
        required: false
    },
    repoType: {
        type: String,
        required: false
    },
    master: RepoBranchSchema,
    development: RepoBranchSchema
});
