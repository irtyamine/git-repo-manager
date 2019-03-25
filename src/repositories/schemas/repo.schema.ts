import * as mongoose from 'mongoose';
import { RepoBranchesObjectSchema } from './repo-branches.object.schema';

export const RepoSchema = new mongoose.Schema({
    repoName: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: false
    },
    reposNamesUpdateTime: {
        type: Number,
        required: false
    },
    repoType: {
        type: String,
        required: false
    },
    branches: RepoBranchesObjectSchema
}, { _id: false });
