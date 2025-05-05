# Codexa

A full-stack MERN (MongoDB, Express, React, Node.js) application.

## Description

Codexa is a web application built with the MERN stack that provides [brief description of what your application does].

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later recommended)
- [npm](https://www.npmjs.com/) (v6.x or later recommended)
- [MongoDB](https://www.mongodb.com/) (local installation or connection to MongoDB Atlas)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended editor)

## Installation and Setup


### Environment Setup

1. In the root directory, create a `.env` file in the server folder:

```bash
cd server
touch .env
```

2. Add your environment variables to the `.env` file:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the Application

### Running the Client (React Frontend)

1. Open a terminal in VS Code
2. Navigate to the client directory:

```bash
cd client
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. The React application will be available at [http://localhost:5173](http://localhost:5173)

### Running the Server (Node.js/Express Backend)

1. Open a new terminal in VS Code
2. Navigate to the server directory:

```bash
cd server
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. The server will be running at the port specified in your `.env` file (default: 5000)

## Technologies Used

- **Frontend**: React, Vite, [other frontend libraries]
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: [JWT/OAuth/etc.]
- **Styling**: [CSS/SCSS/Tailwind/etc.]


## Contact

[deepsahil.online@gmail.com]