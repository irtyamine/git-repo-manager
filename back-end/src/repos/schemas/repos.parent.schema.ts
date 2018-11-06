import * as mongoose from 'mongoose';
import { ReposChildSchema } from './repos.child.schema';

export const ReposParentSchema = new mongoose.Schema({
    repoName: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    master: [ReposChildSchema][0],
    develop: [ReposChildSchema][0],
    development: [ReposChildSchema][0]
});
