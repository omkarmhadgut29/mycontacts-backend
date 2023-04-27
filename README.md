# Contacts Backend API using Node.js, Express.js and MongoDB

This is a simple backend application built with Node.js, Express.js, and MongoDB to handle contacts data.

## Getting Started

Before getting started, make sure you have `Node.js` and `MongoDB` installed on your system.

To get started, clone the repository and install the required dependencies:

```
# Clone the repository
git clone https://github.com/<username>/contacts-backend.git

# Navigate to the project directory
cd contacts-backend

# Install dependencies
npm install
```

Once the dependencies are installed, you can start the server using the following command:

```
npm start

```

The server will be started on http://localhost:5001. You can test the server by navigating to http://localhost:5001/api/contacts on your web browser or using a REST client like `Postman` or `Insomnia`.

## API Endpoints

The following endpoints are available in the API:

### Get all contacts

```
GET /api/contacts
```

This endpoint returns a list of all contacts in the database.

### Get a contact by ID

```
GET /api/contacts/:id
```

This endpoint returns a single contact with the specified ID.

### Create a new contact

```
POST /api/contacts
```

This endpoint creates a new contact and returns the newly created contact.

### Update a contact

```
PUT /api/contacts/:id
```

This endpoint updates the contact with the specified ID and returns the updated contact.

### Delete a contact

```
DELETE /api/contacts/:id
```

This endpoint deletes the contact with the specified ID and returns a success message.

## Dependencies

This project uses the following dependencies:

-   `Express.js` - A web framework for Node.js
-   `Mongoose` - A MongoDB object modeling tool
-   `dotenv` - A zero-dependency module that loads environment variables

## Environment Variables

The following environment variables should be set:

-   `CONNECTION_STRING` - The MongoDB connection URI
-   `PORT` - The port number on which the server should run

You can create a `.env` file in the root directory and set the environment variables there.

```
CONNECTION_STRING= {database_url}
PORT=5001
```
