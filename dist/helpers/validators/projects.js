"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectValidator = void 0;
const zod_1 = require("zod");
// schema definition
const createProjectSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required', invalid_type_error: 'Name must be a String' }).min(1, { message: 'Name is not allowed to be empty' }).trim(),
    description: zod_1.z.string({ required_error: 'Description is required', invalid_type_error: 'Description must be a String' }).min(1, { message: 'Description is not allowed to be empty' }).trim(),
    stack: zod_1.z.string().min(3),
    image: zod_1.z.optional(zod_1.z.string()),
    project_link: zod_1.z.string().url().min(3, { message: 'Project link must exceed 03 characters' }),
});
const createProjectValidator = (data) => {
    return createProjectSchema.safeParse(data).success;
};
exports.createProjectValidator = createProjectValidator;
