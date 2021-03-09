
## Configuring Project

To run the application you need to
1. Clone the repository

```bash
git clone 
```

2. Install dependences

```bash
npm install 
```

3. Run the application

```bash
node app.js 
```

## Description
```
When we get many  posts you can optionally set offset and limit
query parameters
______________________________________
Title - Get posts without authorization 
URL - /api/
METHOD - GET 
________________________________________
Title - Register in the system
URL - /api/register
Method - POST
______________________________
Title - Login in the system
URL - /api/login
Method - POST
______________________________
Title - Edit user information
URL - /api/users/:id
Method - PUT
______________________________
Title - Get users by id
URL - /api/users/:id
METHOD - GET
______________________________
Title - Get users by name
URL - /api/users?name=
METHOD - GET
______________________________
Title - Get users posts by id
URL - /api/users/:id/posts
METHOD - GET
______________________________
Title - Create post
URL - /api/posts
METHOD - POST
______________________________
Title - Edit post
URL - /api/posts/:id
METHOD - PUT
______________________________
Title - Get posts by descrition
URL - /api/posts?description=
METHOD - GET
______________________________
Title - Get posts
URL - /api/posts
METHOD - GET
______________________________
Title - Get top posts
URL - /api/posts/top
METHOD - GET
______________________________
Title - Get post by id
URL - /api/posts/:id
METHOD - GET
______________________________
Title - Delete post 
URL - /api/posts/:id
METHOD - DELETE
```
## Helper Links
```
Handling File Uploads in Node.js with Express and Multer
https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
______________________________________________________________________________
Uploading an Image | Creating a REST API with Node.js
https://www.youtube.com/watch?v=srPXMt1Q0nY&t=179s

Uploading Images with Multer | NodeJS and ExpressJS
https://www.youtube.com/watch?v=wIOpe8S2Mk8
```