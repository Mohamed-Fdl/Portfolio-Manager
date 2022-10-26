import { z } from "zod";


// schema definition
const createUserSchema = z.object({
    name: z.string({required_error : 'Name is required',invalid_type_error : 'Name must be a String'}).min(1,{message : 'Name is not allowed to be empty'}).trim(),
    firstname: z.string({required_error : 'Firstname is required',invalid_type_error : 'Firstname must be a String'}).min(1,{message : 'Firstname is not allowed to be empty'}).trim(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8,{message : 'Password must exceed 08 characters'}),
    title: z.string().min(3,{message : 'Title must exceed 03 characters'}).max(256,{message : 'Too long title,256 characters max'}),
    description: z.nullable(z.string().max(1000,{message : 'Too long description,1000 characters max'}))
})

const loginUserSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8,{message : 'Password must exceed 08 characters'}),
})

const createUserValidator = (data : Object)=>{
    return createUserSchema.safeParse(data).success
}

const loginUserValidator = (data : Object)=>{
    return loginUserSchema.safeParse(data).success
}






export  {createUserValidator,loginUserValidator}