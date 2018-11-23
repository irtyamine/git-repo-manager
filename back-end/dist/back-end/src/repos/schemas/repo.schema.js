"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const repo_branch_schema_1 = require("./repo.branch.schema");
exports.RepoSchema = new mongoose.Schema({
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
    master: repo_branch_schema_1.RepoBranchSchema,
    development: repo_branch_schema_1.RepoBranchSchema
});
//# sourceMappingURL=repo.schema.js.map