import dotenv from 'dotenv'

//load env variable
dotenv.config()


let getImageLink = (image : String)=>{
    return process.env.APP_URL + '/file/'+image
}

export default getImageLink