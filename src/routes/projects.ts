import express, {Request,Response,Router} from 'express'
import {sequelize} from '../starter/dbConnection'
import {ProjectValidator,changeProjectVsibilityValidator} from '../helpers/validators/project'
import getImageLink from '../helpers/generalHelpers'
import User from '../models/User'
import dotenv from 'dotenv'
import auth from '../middlewares/auth'
import Project from '../models/Project'
import { QueryTypes } from 'sequelize'
import upload from '../helpers/multerConfig'
import { userAccessProject } from '../middlewares/userAccessProject'

//load env variables
dotenv.config()


let router : Router = express.Router()

router.post('/',[auth,upload.single('image')], async function (req : Request, res : Response)  : Promise<Response> {
    if (!ProjectValidator(req.body)) return res.status(400).json({error : true,message : 'Bad request.Make sure you send good data format.',data : null})
    req.body.image = ''
    req.body.UserId = req.user.data.id

    if(req.file){
        req.body.image = getImageLink(req.file.filename)
    }
    try {
        let project = await Project.create(req.body)

        return res.status(200).json({
            error : false,
            message : 'Project created successfully.',
            data : project.toJSON(),
        })
    } catch (err) {
        return res.status(500).json({
            error : true,
            message : 'Oups..!Something went wrong :(',
            data : err,
        })
    }
})

router.get('/',auth, async function (req : Request, res : Response)  : Promise<Response> {
    try {
        const projects = await sequelize.query("SELECT * FROM `projects` WHERE UserId = ? ",{
            replacements: [req.user.data.id],
            type: QueryTypes.SELECT
        })
        
        return res.status(200).json({
            error : false,
            message : 'Retriving all projects of '+req.user.data.email,
            data : projects,
        })
    } catch (err) {
        return res.status(500).json({
            error : true,
            message : 'Oups..!Something went wrong :(',
            data : err,
        })
    }
})

router.get('/:id',auth, async function (req : Request, res : Response)  : Promise<Response> {
    try {
        const project = await Project.findOne({where : {id: req.params.id}}) 
        
        return res.status(200).json({
            error : false,
            message : 'Retriving the project (id : '+req.params.id+') of '+req.user.data.email,
            data : project,
        })
    } catch (err) {
        return res.status(500).json({
            error : true,
            message : 'Oups..!Something went wrong :(',
            data : err,
        })
    }
})

router.get('/getUserProjects/:email', async function (req : Request, res : Response)  : Promise<Response> {
    try {
        let user = await User.findOne({ where: { email: req.params.email}})
        
        const projects = await sequelize.query("SELECT * FROM `projects` WHERE UserId = ? AND visibility = ?",{
            replacements: [user?.id,true],
            type: QueryTypes.SELECT
        })

        return res.status(200).json({
            error : false,
            message : 'Retriving all visible projects of '+req.params.email,
            data : projects,
        })
    } catch (err) {
        return res.status(500).json({
            error : true,
            message : 'Oups..!Something went wrong :(',
            data : err,
        })
    }
})

router.put('/:id',[auth,userAccessProject,upload.single('image')] ,async function (req : Request, res : Response)  : Promise<Response> {


    if (!ProjectValidator(req.body)) return res.status(400).json({error : true,message : 'Bad request.Make sure you send good data format.',data : null})

    req.body.UserId = req.user.data.id

    if(req.file){
        req.body.image = getImageLink(req.file.filename)
    }

    try {
        await Project.update(req.body,{where : {id : req.params.id}})

        let project = await Project.findOne({where : {id: req.params.id}})

        return res.status(200).json({
            error : false,
            message : 'Project updated successfully.',
            data : project,
        })
    } catch (err) {
        return res.status(500).json({
            error : true,
            message : 'Oups..!Something went wrong :(',
            data : err,
        })
    }
})

router.put('/visibility/:id',[auth,userAccessProject] ,async function (req : Request, res : Response)  : Promise<Response> {

    if (!changeProjectVsibilityValidator(req.body)) return res.status(400).json({error : true,message : 'Bad request.Make sure you send good data format.',data : null})

    let {visibility} = req.body
    try {
        await Project.update({visibility},{where : {id : req.params.id}})

        let project = await Project.findOne({where : {id: req.params.id}})

        return res.status(200).json({
            error : false,
            message : 'Project visibility updated successfully.',
            data : project,
        })
    } catch (err) {
        return res.status(500).json({
            error : true,
            message : 'Oups..!Something went wrong :(',
            data : err,
        })
    }
})

router.delete('/:id',[auth,userAccessProject] ,async function (req : Request, res : Response)  : Promise<Response> {


    try {
        let project = await Project.findOne({where : {id: req.params.id}})

        await Project.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.status(200).json({
            error : false,
            message : 'Project deleted successfully.',
            data : project,
        })
    } catch (err) {
        return res.status(500).json({
            error : true,
            message : 'Oups..!Something went wrong :(',
            data : err,
        })
    }
})




export default router