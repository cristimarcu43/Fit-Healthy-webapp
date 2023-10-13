**Fit&Healthy**

# Description

It is a web application with fitness and nutrition services intended for users, featuring a user-friendly and intuitive graphical interface.

Users can be of two types: administrators and regular users.

## Features

- Authentication system (JWT token)
- Nutrition section exploration
- Body mass index calculator
- Access to courses (only when authenticated)
- Providing feedback on courses - comments and ratings (only when authenticated)
- Creating posts, updates, and deletions (only when authenticated)
- Viewing all application users and their posts
- Users can perform all 4 CRUD operations

### Technologies Used

Frontend -> HTML, CSS + Tailwind, JavaScript, React
Backend -> Node.js, Express + MongoDB

#### Code Implementation

For both the backend and frontend, the code has been organized into files with suggestive titles.

Frontend Structure: For each functionality, an element (skeleton) is constructed in a .js file. Mapping of the element is done in one .js file, and in another .js file, the request is made to access the data and return the content on the page.

Backend Structure: In the main file server.js, modules and middleware are used to handle HTTP requests and communicate with the MongoDB database. In models, the schemas that will be created in the database with the fields corresponding to each component are found. In controllers, the logic and functionalities specific to the respective route are implemented. Specifically, the role is to organize and separate the handling of HTTP requests from the rest of the application to make the code more modular and easier to maintain. In routes, routes for the application's functionalities are defined and manage the path of HTTP requests to the corresponding controllers.

##### Deployment

The server has been added to the "www.render.com" platform, and the frontend to "www.vercel.com".

"https://fit-healthy-webapp-frontend.vercel.app/"
