
============================== Detailed Description Running Server On Local Machine ======================

Requirements:

1. Ensure that you have the LTS version of Node installed.
2. Install git for version control.
3. Install MongoDB compass.
Installation steps on local machine:

1. Fork this repository.
2. Clone your forked version of the repository locally. To do this, navigate to your command line or terminal, move to an appropriate directory, and type:

    e.g git clone https://github.com/<your_username>/cuzradio.git

3. While in the "server" directory, install the backend dependencies using npm install.
4. Create a .env file in your server and add the MONGO_URI, JWT_SECRET and PORT.
5. Go to MongoDB Atlas, create your database, and use the connection string in MONGO_URI variable and PORT = 5000.
6. Navigate inside the "server" directory and start the backend server using either npm start or npm run dev. The backend server will start on localhost:5000.

Note:
Remember to close all running servers before starting the backend server , close server with ctrl+c.


================================HERE ARE THE DESCRIPTIONS FOR EACH ENDPOINT REQUEST===============================

1. Register a New User

        Endpoint: POST /api/auth/register
        Description: This endpoint allows a new user to sign up by providing their name, email, and password.This endpoint automatically  set the role of every registration has a secondary user
        Example of Request Body in json:
        {
            "name": "Micheal Dada",
            "email": "email@gmail.com",
            "password": "Password@123"
        }

2. User Login

        Endpoint: POST /api/auth/login
        Description: This endpoint allows a user to log in by providing their email and password.
        Example of Request Body in json:
        {
            "email": "email@gmail.com",
            "password": "Password@123"
        }

3. Get All Users

        Endpoint: GET /api/users
        Description: This endpoint retrieves a list of all registered users. Requires a valid Bearer Token for authorization. Only an admin user, primary and secondary user can get all users
        Authorization: Bearer Token: <token>



4. Create a User

        Endpoint: POST /api/users/create-user
        Description: This endpoint allows an admin to create a new user by providing the user's name, email, and password. Requires a valid Bearer Token for authorization. Only an admin user can create a new user in the platform
        Example of Request Body in json:


        {
            "name": "Micheal James",
            "email": "email0113@gmail.com",
            "password": "Password@123"
        }
        Authorization: Bearer Token: <token>


5. Get User by ID

        Endpoint: GET /api/users/:id
        Description: This endpoint retrieves details of a specific user by their user ID. Requires a valid Bearer Token for authorization. Only an admin user and primary user can get a user by their ids
        Authorization: Bearer Token: <token>


6. Update User Details or Role

        Endpoint: PUT /api/users/:id
        Description: This endpoint allows updating details or the role of a specific user by their user ID. Requires a valid Bearer Token for authorization. Only an admin user and primary user can update the details
        Example of Request Body in json:
        {
            "name": "Micheal Musa",
            "role": "primary"
        }
        Authorization: Bearer Token: <token>


7. Delete a User

        Endpoint: DELETE /api/users/:id
        Description: This endpoint allows deleting a specific user by their user ID. Requires a valid Bearer Token for authorization. Only an admin user can delete a user
        Authorization: Bearer Token: <token>


==============LOGIN DETAILS FOR ADMIN USER =============================

Manually change a user role of your choice in the database to admin