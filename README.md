# PORTFOLIO MANAGER API
This node/typescript project is about the API for managing portfolio realisations.You can create an account ,log in, add projects,manage their visibility

## Environment variables

| Name  | Comment    | Value                                           |
|-------|------------------|---------------------------------------------------|
| NODE_ENV   | The node env mode      | Development|
| MY_PORT   | The port I use on my local computer      |8000|
| APP_URL   | The app url to access it      |http://localhost:8000|
| JWT_SECRET   | Toke to sign JWTs token      |jmxJfFzADLL5lV2n9FEoBCdIGht9x2c|
| BCRYPT_SALT_ROUND   | The salt round brcypt use to hash passwords of users      |5|


## Database structure
I used a SQLITE database located in ./src/db.sqlite with the npm package named Sequelize
### Collections
I need to store users and their projects

#### Users

| Field  | Type    | Comment  |Example|
|-------|------------------|----------------------------|------------------------|
| lastname   | STRING    | The user lastname| Joe|
| firstname   | STRING    | The user firstname| Dalton|
| email   | STRING    | The user email| joe@gmail.com|
| password   | STRING   | The user password hashed with bcrypt| jmxJfFzADLL5lV2n9FEoBCdIGht9x2c|
| title   | STRING    | The user profile title| Data scientist|
| description   | STRING    | The user profile description| Some long description|
| isAdmin   | BOOLEAN    | True if user is admin & false else| false|

#### Projects

| Field  | Type    | Comment  |Example|
|-------|------------------|----------------------------|------------------------|
| name   | STRING    | The project name| API for portfolio management|
| description   | STRING    | The project description| Somme long description|
| stack   | STRING    | The stack of the project| HTML,JS,....|
| image   | STRING   | A preview as image of the project.After storing image ,system return the link to access it| http://localhost:8000/file/image-1672387312388-550274169.webp|
| project_link   | STRING    | Url to access project| https://github.com/Mohamed-Fdl/dali|
| visibility   | BOOLEAN    | True means it is public and everyone with your email can access it.| True|
| UserId   | Number    | Represent the owner of the project| 2|


## Middlewares
In this application I have 02 middlewares

| Name  | Why    | Comment  |
|-------|------------------|----------------------------|
| Auth   | Accept only connected user.For example non-user can't create a pproject    | *Check if there is the header x-auth-token *Verify it and continue the request *If it is a invalid token or there is not x-auth-token ,the request is does not pass| 
| UserAccessProject   | User can't access other project    | This middleware is about assert user can access and modify a project that he created| 


## Routes

### users.ts
Base url : /api/user

| Verb  | Url              | Actions                                           |Middlewares|
|-------|------------------|---------------------------------------------------|-------------|
| POST   | /register       |Create a new user. Body = {lastname,firstname,email,password,title,description}    |None|
| POST   | /login      |Log a user. Body = { email, password }.After that user receive a token in the response.The token is used to log the user and access ressources   |None|


### projects.ts
Base url : /api/project

| Verb  | Url              | Actions                                           |Middlewares|
|-------|------------------|---------------------------------------------------|-------------|
| POST   | /      | Create a new project.Body = {name,description,stack,image?,project_link}|Auth|
| GET   | /      |Get all projects of the current user|Auth|
| GET   | /:id      |Get the specific project which match with 'id'|Auth|
| GET   | /getUserProject/:email      |Get all visible projects of the user with email : 'email'|None|
| PUT   | /:id       |Update a specific project.  Body = {name,description,stack,image?,project_link}   |Auth UserAccessProject|
| PUT   | /visibility/:id       |Change the project's visibility .  Body = {visibility}   |Auth UserAccessProject|
| DELETE   | /:id      |Delete a specific project   |Auth UserAccessProject|


## Somes helpers
They are located at the ./src/helpers directory.

#### sign.ts
Is about signing datas to get jwt token using the {id,email,isAdmin} of user

#### multerConfig.ts
Is about configurations to files uploads

#### generalHelpers.ts
It return the image link with the image name extracted from the request

#### validators
This directory contains two files : project.ts and user.ts.The user.ts export a function to validate user format data.The project.ts file do the same thing but in the case of project

## Cron job
I create a cron task to backup the db.sqlite file in a directory called db_backups.It save the db every first day of the mounth
cron.js located at the ./src/cron.js.







