"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeProjectVsibilityValidator = exports.ProjectValidator = void 0;
const zod_1 = require("zod");
// schema definition
const ProjectSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required', invalid_type_error: 'Name must be a String' }).min(1, { message: 'Name is not allowed to be empty' }).trim(),
    description: zod_1.z.string({ required_error: 'Description is required', invalid_type_error: 'Description must be a String' }).min(1, { message: 'Description is not allowed to be empty' }).trim(),
    stack: zod_1.z.string().min(3),
    project_link: zod_1.z.string().url().min(3, { message: 'Project link must exceed 03 characters' }),
});
const changeVisibilityProjectSchema = zod_1.z.object({
    visibility: zod_1.z.boolean(),
});
const ProjectValidator = (data) => {
    return ProjectSchema.safeParse(data).success;
};
exports.ProjectValidator = ProjectValidator;
const changeProjectVsibilityValidator = (data) => {
    return changeVisibilityProjectSchema.safeParse(data).success;
};
exports.changeProjectVsibilityValidator = changeProjectVsibilityValidator;
