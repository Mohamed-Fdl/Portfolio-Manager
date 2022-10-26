import {sequelize} from '../starter/dbConnection'
import { QueryTypes } from 'sequelize';
import  {Request,Response} from 'express';


const userAccessProject =async (req:Request,res : Response,next : Function)=>{
    try {
        const project = await sequelize.query("SELECT * FROM `projects` WHERE UserId = ? AND id = ?",{
            replacements: [req.user.data.id,req.params.id],
            type: QueryTypes.SELECT
        });
    
        if(project.length===0) return res.status(403).json({error : true,message : 'You are not authorized to access this project.',data : null})
    
        next()
        
    } catch (err) {
        return res.status(500).json({
            error : true,
            message : 'Oups..!Something went wrong :(',
            data : null,
        })
    }
}



export {userAccessProject}