# ABOUT PROJECT
This project helps to create a CRUD for users using MongoDB, you can see the following methods: 

1. List all users using a http get method
2. Show a specific user using a http get method 
3. Create a user using a http post method
4. Update a user using a http put method
5. Delete a specific user using a http delete method 

***

## Installation
1. Clone repository or download files
2. npm install - installing all dependencies into package file
3. create a .env file and put in those code lines
```
PORT = "any port"
CONNECTION_DB = "connection from Mongo DB"
```
4. run project with node app.js

***
## Usage

_How can you use this project_

**GET HTTP**

* /user/list -> return all data from users
* /user/:id -> return the specific user

**POST HTTP**

* /user -> send user information into database

**PUT HTTP**

* /user/:id -> update user from specific id

**DELETE HTTP**

* /user/:id -> delete user from specific id


## Features
1. express
2. dotenv
3. mongoose
4. cors