import * as mongoose from 'mongoose';

export const UserBranchesSchema = new mongoose.Schema({
    branchName: {
        type: String,
        required: true
    },
    aliases: {
        type: Array,
        required: false
    }
});
