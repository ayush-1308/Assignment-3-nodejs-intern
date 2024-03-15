# Assignment 3 (Social Network API)

This is a simple Node.js application using Express, MongoDB, and JWT for authentication.

## Prerequisites

- Node.js and npm installed on your machine
- MongoDB server running locally or a MongoDB Atlas account

## Setup

1. Clone the repository:

git clone https://github.com/ayush-1308/Assignment-3-nodejs-intern.git

2. Navigate to the project directory:

cd yourrepository

3. Install the dependencies:

npm install

4. Create a .env file in the root of your project and add the following:

JWT_SECRET=your_jwt_secret

Replace your_jwt_secret with a secret string of your choice. This will be used to sign the JWTs.

4. Start the server

nodemon index.js


## API Endpoints
- GET /users/:id: Get a user by their ID
- PUT /users/:id: Update a user by their ID
- DELETE /users/:id: Delete a user by their ID
- POST /posts: Create a new post
- GET /posts/:id: Get a post by its ID
