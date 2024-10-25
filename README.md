# Rule Engine

## Overview

The Rule Engine is a flexible and extensible system designed to evaluate complex business rules using an Abstract Syntax Tree (AST) based schema. This project allows users to define rules and evaluate them dynamically based on various conditions.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Design Choices](#design-choices)
- [Dependencies](#dependencies)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following software installed:
- React.js
- Node.js (version 14.x or higher)
- MongoDB (if not using the containerized version)
- Express.jS
- MUI

## Installation

1. **Clone the repository:**
```bash
   git clone https://github.com/itzabhay01/Rule_Engine.git
   cd Rule_Engine
   ```
2. ## Set up the backend:

Alternatively, install dependencies manually:

```bash
cd backend
npm install
```
3. ## Set up the frontend:

```bash
cd frontend
npm install
```
4. ## Running the Application
To run the application locally, you need to have both the backend and frontend running.

### Start the backend:

```bash
cd backend
npm start
```
### Start the frontend:

```bash
cd frontend
npm start
```
## The application should now be running on http://localhost:PORT.

## Environment Variables
You will need to create a .env file in both the backend and frontend folders to set up the environment variables.

## Backend Environment Variables
env
```bash
PORT=YOUR_BACKEND_PORT
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
PASSWORD=YOUR_MONGO_PASSWORD
```
## Frontend Environment Variables
Create a .env file in the frontend folder with the following content:

env
```bash
VITE_APP_API_URL=http://localhost:YOUR_BACKEND_PORT
```
## Design Choices

- **Abstract Syntax Tree (AST)**: The core of the rule engine is an AST that allows for flexible rule definitions and evaluations.
- **Mongoose for Database Interaction**: Mongoose is used for MongoDB interaction, providing a schema-based solution to model application data.
- **Modular Structure**: The project is organized into separate backend and frontend folders, ensuring clear separation of concerns.

## Dependencies

### Backend

- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for the browser and Node.js.

## Usage

After setting up the environment variables and starting both services, you can access the application through the frontend interface. Use the provided UI to create and evaluate rules.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
