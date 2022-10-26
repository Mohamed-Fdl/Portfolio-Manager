import express, {Request,Response,Router} from 'express';
import {createUserValidator,loginUserValidator} from '../helpers/validators/user';
import sign from '../helpers/sign';
import User from '../models/User'
import {omit} from 'underscore'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { Mailer } from '../mail'
import {userRegisterMail} from '../mail/messages'

//load env variable
dotenv.config()


let router : Router = express.Router()

router.post('/register', async function (req : Request, res : Response)  : Promise<Response> {
    if (!createUserValidator(req.body)) return res.status(400).json({error : true,message : 'Bad request.Make sure you send good data format.',data : null})

    req.body.isAdmin = false

    
    try {
        let hash = await bcrypt.hash(req.body.password, Number(process.env.BCRYPT_SALT_ROUND))
        req.body.password = hash  
    
        const user = await User.create(req.body);

        Mailer(userRegisterMail(user.toJSON().name,user.toJSON().title),user.toJSON().email)

        return res.status(200).json({
            error : false,
            message : 'User succesfullly registered.',
            data : omit(user.toJSON(),'password'),
        })


    } catch (err) {
        return res.status(500).json({
            error : true,
            message : 'Oups..!Something went wrong :(',
            data : err,
        })
    }
})

router.post('/login', async function (req : Request, res : Response)  : Promise<Response> {
    if (!loginUserValidator(req.body)) return res.status(400).json({error : true,message : 'Bad request.Make sure you send good data format.',data : null})

    try {
        const user : User|null  = await User.findOne({ where: { email: req.body.email } });

        if(user && bcrypt.compareSync(req.body.password, user.password)){            
            return res.status(200).json({
                error : false,
                message : 'User succesfullly logged.',
                data : {user : omit(user.toJSON(),'password'),token : sign({id : user.id,email : user.email,isAdmin : user.isAdmin})},
            })
        }else{
            return res.status(200).json({
                error : true,
                message : 'Your credentials does not match',
                data : null,
            })
        }
    } catch (err) {
        return res.status(500).json({
            error : true,
            message : 'Oups..!Something went wrong :(',
            data : err,
        })
    }
})


export default router