import jwt,{Secret} from 'jsonwebtoken';
import  {Request,Response} from 'express';

const auth = (req:Request,res : Response,next : Function)=>{
    let token : string = ''

    if(req.headers['x-auth-token']){

        token = req.headers['x-auth-token'].toString()

        let SECRET_KEY: Secret = process.env.JWT_SECRET ?process.env.JWT_SECRET : ''

        try{
            let decoded= jwt.verify(token,SECRET_KEY);
            req.user = decoded
            next()
        }catch(err){
            return res.status(401).json({
                error : true,
                message : 'Not authorized',
                data : null,
            })
        }
    }else{
        return res.status(400).json({
            error : true,
            message : 'Bad request',
            data : null,
        })
    }
}

export default auth