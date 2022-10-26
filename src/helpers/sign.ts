import  jwt,{Secret}  from "jsonwebtoken";
import dotenv from 'dotenv'

//load env variable
dotenv.config()

let SECRET_KEY: Secret = process.env.JWT_SECRET ?process.env.JWT_SECRET : '';

let sign = (data : Object)=>{
    return jwt.sign({exp:Math.floor(Date.now()/1000)+(60*60), data : data},SECRET_KEY);
}

export default sign