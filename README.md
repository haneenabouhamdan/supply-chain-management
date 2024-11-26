# supply-chain-management


  ### Backend
The backend directory contains all server-side code and APIs. It includes:
- **APIs**: Different endpoints for managing orders, products, shipments, and other core functionalities.
- **Database**: Configuration and models for interacting with the database.
- **Authentication**: Implementations for user authentication and authorization.

### Frontend
The frontend directory contains the client-side application built with React and Chakra UI. It includes:
- **Components**: Reusable UI components and pages.
- **State Management**: Configuration for managing state with tools like Context API.
- **Routing**: Setup for client-side routing using React Router.
## Let's Get Started

To get started, follow these steps:

  **Clone the Repository**

    git clone https://github.com/haneenabouhamdan/supply-chain-management.git

 **Navigate to Backend Repository**

    cd backend

<h2>Backend</h2>

 **Description**

This app use:
[Nest](https://github.com/nestjs/nest) is a progressive Node.js framework for building efficient, reliable and scalable server-side applications.

**Prerequisites**

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm).
- You have installed [PostgreSQL](https://www.postgresql.org/download/). Follow the [PostgreSQL setup guide](https://www.postgresqltutorial.com/postgresql-getting-started/install-postgresql/).
- You have installed [Redis](https://redis.io/download). Follow the [Redis setup guide](https://redis.io/topics/quickstart).

**Install the dependencies:**

    npm install

**Create Database named suppy_chain_db and run migrations:**
  
    npm run m:run
  
**Running the app**

Make sure to run postgres and redis before starting the app.

    # development
    npm run start


    # watch mode
    npm run start:dev



After complete setup for the backend, now it's time to run the frontend.

<h2>Frontend</h2>
  
  **Navigate to the Frontend Repository**
   
     cd ../frontend

**Install the dependencies:**

    npm install
   
**Running the app:**

    npm run start
    

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

