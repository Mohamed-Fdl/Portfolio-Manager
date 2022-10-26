# PORTFOLIO MANAGER API
This node/typescript project is about the nodejs API for the project of managing portfolio projects.You can create an account ,log in, add projects,manage their visibility

## Environment variables

NODE_ENV  = "development"

MY_PORT = 8000

JWT_SECRET = 'y2rLnujPjmxJfFzADLL5lV2n9FEoBCdIGht9x2cESTJ9Y6TejW'

BCRYPT_SALT_ROUND = 10

## Database structure
I used a SQLITE database located in ./src/db.sqlite with the npm package named Sequelize
### Collections
I need to store users and their projects

* usersCollection : the users of sevexchange
    {
        name: String,
        firstname: String,
        email: String,
        password: String hashed with bcrypt,
        title: String,
        description: String,
        isAdmin: Boolean true if admin ,false if else but false by default
    }

    {name,firstname,email,password,title,description}
* projectsCollection
    { 
        name: String,
        description: String,
        stack: String,
        image: String 
        project_link: String an url  
        visibility: Boolean
        UserId: Number
    }


## Middlewares
In this application I have 02 middlewares

#### Auth
This middleware is about authentication of users

*Check if there is the header x-auth-token
*Verify it and continue the request 
*If it is a invalid token or there is not x-auth-token ,the request is does not pass

#### UserAccessProject 
This middleware is about assert user can access and modify a project



## Routes

### users.ts
Base url : /api/user

| Verb  | Url              | Actions                                           |Middlewares|
|-------|------------------|---------------------------------------------------|-------------|
| POST   | /register       |Create a new user. Body = {name,firstname,email,password,title,description}    |None|
| POST   | /login      |Log a user. Body = { email, password }.After that user receive a token in the response.The token is used to log the user and access ressources   |None|


### projects.ts
Base url : /api/project

| Verb  | Url              | Actions                                           |Middlewares|
|-------|------------------|---------------------------------------------------|-------------|
| POST   | /      | Create a new project.Body = {name,description,stack,image,project_link}|Auth|
| GET   | /      |Get all projects of the current user|Auth|
| GET   | /:id      |Get the specific project which match with 'id'|Auth|
| GET   | /getUserProject/:email      |Get all visible projects of the user with email : 'email'|None|
| PUT   | /:id       |Update a specific project.  Body = {name,description,stack,image,project_link}   |Auth UserAccessProject|
| PUT   | /visibility/:id       |Change the project's visibility .  Body = {visibility}   |Auth UserAccessProject|
| DELETE   | /:id      |Delete a specific project   |Auth UserAccessProject|

## Mailing (using nodemailer)
-Located in the Mail directory.In the index.ts file is set all parameters to send mail with nodemailer.It export two functions (mail and resetMail) which take 02 parameters (email : to send email,link : the link)
-The registerMail.ts export a function which take the link of verification and make the email message to send
-The resetPasswordMail.ts export a function which take the link to reset password and make the email message to send

## Somes helpers
They are located at the ./src/helpers directory.

#### sign.ts
Is about signing datas to get jwt token using the {id,email,isAdmin} of user

#### multerConfig.ts
Is about configurations to files uploads

#### validators
This directory contains two files : project.ts and user.ts.The user.ts export a function to validate user format data.The project.ts file do the same thing but in the case of project







