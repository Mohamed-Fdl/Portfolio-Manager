import { z } from "zod";


// schema definition
const ProjectSchema = z.object({
    name: z.string({required_error : 'Name is required',invalid_type_error : 'Name must be a String'}).min(1,{message : 'Name is not allowed to be empty'}).trim(),
    description: z.string({required_error : 'Description is required',invalid_type_error : 'Description must be a String'}).min(1,{message : 'Description is not allowed to be empty'}).trim(),
    stack: z.string().min(3),
    project_link: z.string().url(),
})

const changeVisibilityProjectSchema = z.object({
    visibility: z.boolean(),
})


const ProjectValidator = (data : Object)=>{
    return ProjectSchema.safeParse(data).success
}

const changeProjectVsibilityValidator = (data : Object)=>{
    return changeVisibilityProjectSchema.safeParse(data).success
}







export  {ProjectValidator,changeProjectVsibilityValidator}