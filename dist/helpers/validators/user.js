"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserValidator = exports.createUserValidator = void 0;
const zod_1 = require("zod");
// schema definition
const createUserSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required', invalid_type_error: 'Name must be a String' }).min(1, { message: 'Name is not allowed to be empty' }).trim(),
    firstname: zod_1.z.string({ required_error: 'Firstname is required', invalid_type_error: 'Firstname must be a String' }).min(1, { message: 'Firstname is not allowed to be empty' }).trim(),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(8, { message: 'Password must exceed 08 characters' }),
    title: zod_1.z.string().min(3, { message: 'Title must exceed 03 characters' }).max(256, { message: 'Too long title,256 characters max' }),
    description: zod_1.z.nullable(zod_1.z.string().max(1000, { message: 'Too long description,1000 characters max' }))
});
const loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(8, { message: 'Password must exceed 08 characters' }),
});
const createUserValidator = (data) => {
    return createUserSchema.safeParse(data).success;
};
exports.createUserValidator = createUserValidator;
const loginUserValidator = (data) => {
    return loginUserSchema.safeParse(data).success;
};
exports.loginUserValidator = loginUserValidator;
