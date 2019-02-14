"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const repo_branches_object_schema_1 = require("./repo-branches.object.schema");
exports.RepoSchema = new mongoose.Schema({
    repoName: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: false
    },
    repoType: {
        type: String,
        required: false
    },
    branches: repo_branches_object_schema_1.RepoBranchesObjectSchema
}, { _id: false });
//# sourceMappingURL=repo.schema.js.map