# CRUDexercice

# Express CRUD Application

This is a simple Express application that implements CRUD operations for managing users.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [npm](https://www.npmjs.com/) installed on your machine

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/express-crud-app.git
   cd express-crud-app

2. install and launch

    Use npm install in your terminal
    
    and use node app.js in your

3. The following endpoints are available in the application:

Get all users

    URL: /users
    Method: GET
    Description: Retrieves a list of all users.
    Response: JSON array of user objects.
    
Get a user by ID

    URL: /users/:id
    Method: GET
    Description: Retrieves a user by their ID.
    Response: JSON object of the user if found, otherwise a 404 error.
    
Create a new user

    URL: /users
    Method: POST
    Description: Creates a new user.
    Request Body: JSON object containing name and email fields.
    Response: JSON object of the newly created user with a 201 status code.
    
Update a user

    URL: /users/:id
    Method: PUT
    Description: Updates an existing user by their ID.
    Request Body: JSON object containing name and email fields.
    Response: JSON object of the updated user if found, otherwise a 404 error.
    
Delete a user

    URL: /users/:id
    Method: DELETE
    Description: Deletes a user by their ID.
    Response: JSON object of the deleted user if found, otherwise a 404 error.

