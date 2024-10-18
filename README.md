
# PZ Cheeseria

This is a very small-scale Cheese web application for all the cheese lovers out there.

## Table of Contents

- [PZ Cheeseria](#pz-cheeseria)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [API Endpoints](#api-endpoints)
    - [Create a New Cheese](#create-a-new-cheese)
    - [Read Cheese Data](#read-cheese-data)
    - [Update Cheese Data](#update-cheese-data)
    - [Delete Cheese Data](#delete-cheese-data)
  - [Available Scripts](#available-scripts)
    - [Root Scripts](#root-scripts)
      - [Build the Docker Image](#build-the-docker-image)
      - [Run the Docker Container](#run-the-docker-container)
    - [Backend Scripts](#backend-scripts)
      - [Run API Tests](#run-api-tests)
      - [Compile TypeScript Files](#compile-typescript-files)
      - [Start the Server](#start-the-server)
  - [Contact](#contact)
  - [Technologies Used](#technologies-used-1)

## Features

- Display the menu of available cheeses at a cheeseria
- Calculate the price of the cheese

## Technologies Used

This project utilizes the following technologies:

- **Frontend:** React, TypeScript
- **Backend:** Express.js, Node.js, Typescript
- **Other Technologies:** Docker

## Installation

Follow these steps to get your development environment up and running:

1. Clone the repository:

   ```bash
   git clone https://github.com/peachnono/Cheeseria.git
   ```

2. Navigate into the project directory:

   ```bash
   cd Cheeseria
   ```

## API Endpoints

For comprehensive API documentation, including detailed descriptions of each endpoint, request/response examples, and error codes, please visit the full documentation at `/api-docs`. The UML diagram of this can also be found at the root folder labeled "API Design.png"

This API provides various endpoints for managing cheeses. Below is a list of available routes and their functionalities:

### Create a New Cheese

- **POST** `/cheeses`
  - Creates a new cheese entry in the database.
  - **Request Body:** A JSON object representing the cheese (e.g., `{ "name": "Abondance", "pricePerKilo": 50, "colour": "Yellow" }`).
  - **Response:** Returns the created cheese object with a 201 status code.

### Read Cheese Data

- **GET** `/cheeses`
  - Retrieves a list of all cheeses.
  - **Response:** Returns an array of cheese objects.

- **GET** `/cheeses/:id`
  - Retrieves a specific cheese by its ID.
  - **Parameters:** `id` - The unique identifier for the cheese.
  - **Response:** Returns the cheese object if found; otherwise, returns a 404 status code.

- **GET** `/cheeses/:id/price`
  - Retrieves the price of a specific cheese by its ID.
  - **Response:** Returns the cheese ID and its price if found; otherwise, returns a 404 status code.

- **GET** `/cheeses/:id/picture`
  - Retrieves the picture of a specific cheese by its ID.
  - **Response:** Returns the image data; sets `Content-Type` to `image/jpeg`.

- **GET** `/cheeses/:id/cost/:weight`
  - Calculates the cost of a specific cheese for a given weight (in kilograms).
  - **Parameters:**
    - `id` - The unique identifier for the cheese.
    - `weight` - The weight of the cheese in kilograms.
  - **Response:** Returns the total cost of the cheese based on the specified weight. If the weight is invalid, returns a 400 status code.

### Update Cheese Data

- **PUT** `/cheeses/:id`
  - Updates an existing cheese entry by its ID.
  - **Parameters:** `id` - The unique identifier for the cheese.
  - **Request Body:** A JSON object representing the updated cheese.
  - **Response:** Returns the updated cheese object; if not found, returns a 404 status code.

### Delete Cheese Data

- **DELETE** `/cheeses/:id`
  - Deletes a cheese entry by its ID.
  - **Parameters:** `id` - The unique identifier for the cheese.
  - **Response:** Returns a 204 status code (No Content) if successful; if not found, returns a 404 status code.

## Available Scripts

In the project directory, you can run the following commands:

### Root Scripts

#### Build the Docker Image

This command builds the application as a Docker image named `cheeseria`.

```bash
docker build -t cheeseria .
```

#### Run the Docker Container

This command spins up the Docker container, mapping port 5000 of the host to port 5000 of the container.

```bash
docker run -p 5000:5000 cheeseria
```

### Backend Scripts

In the `backend` directory, you can run the following commands:

#### Run API Tests

This command executes the test cases for the API endpoints, ensuring that everything is functioning as expected.

```bash
npm test
```

#### Compile TypeScript Files

This command compiles the TypeScript files, producing a `/dist` folder containing the compiled JavaScript files for Node.js.

```bash
npx tsc
```

#### Start the Server

This command runs the application on the server using the compiled files from the `/dist` folder.

```bash
node dist/app.js
```

## Contact

For any questions or inquiries, feel free to reach out:

- **Name:** Nicole Hordejan
- **Email:** <nhordejan@gmail.com>

## Technologies Used

- Added user functionality to give admin users access to add, delete, and update cheeses.
- The images are stored locally for simplicity but this is not considered scalable so the app would need a database instead.
- I would also add a checkout system so the user can calculate the price of multiple cheeses at the same time.
