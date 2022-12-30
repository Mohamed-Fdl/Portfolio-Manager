import express, {Request,Response,Application} from 'express'
import {connection} from './starter/dbConnection'
import dotenv from 'dotenv'

const app:Application = express()

//load env variable
dotenv.config()

// routes
import users from './routes/users'
import projects from './routes/projects'

//db connaction
//connection()


//serve static files at ./src/uploads
app.use('/file',express.static('./src/uploads'))
app.use(express.static('./src/public'))



//middlewares 
app.use(express.json())


// route app
app.use('/api/user', users)
app.use('/api/project', projects)


const PORT = process.env.PORT || process.env.MY_PORT


app.listen(PORT, ():void => {
    console.log(`Server Running here :  http://localhost:${PORT}`)
});
