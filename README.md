# Invoice App Backend

This is the backend server for the Invoice App, built using Node.js, Express.js, and MongoDB. The backend provides a REST API to handle invoice-related operations such as creating, updating, fetching, and deleting invoices. The app is deployed on Vercel, and the server manages API requests, database connections, and server-side logic.

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Technologies

- **Node.js**: JavaScript runtime for the backend server.
- **Express.js**: Web framework for building the REST API.
- **MongoDB**: NoSQL database for storing invoice data.
- **Mongoose**: ODM for MongoDB for schema modeling.
- **Vercel**: Used for deployment.

## Features

- CRUD operations for invoices.
- Secure API with environment variables for sensitive data.
- Modular architecture for easy scalability.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) instance (either local or cloud)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KrishnaVishwakarma1595/invoice-app-server.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd invoice-app-backend
   ```

3. **Install the dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables** (see [Environment Variables](#environment-variables) below).

5. **Start the server**:
   ```bash
   npm run dev
   ```

The server should now be running on `http://localhost:3001`.

## Environment Variables

You need to set up the following environment variables in a `.env` file:

```bash
MONGO_URI=<your-mongo-db-uri>
PORT=<your-server-port>
```

Replace `<your-mongo-db-uri>` with your MongoDB connection string and `<your-server-port>` with the port you want the server to run on (default is `5000`).

## API Endpoints

| Method | Endpoint          | Description                      |
|--------|-------------------|----------------------------------|
| GET    | `/api/invoices`    | Fetch all invoices               |
| GET    | `/api/invoices/:id`| Fetch a single invoice by ID     |
| POST   | `/api/invoices`    | Create a new invoice             |
| POST   | `/api/updateinvoice`| Update an existing invoice by ID |
| POST   | `/api/removeinvoice`| Delete an invoice by ID          |
| POST   | `/api/markaspaid` | Mark an invoice paid by ID          |

### Example Request

**Create Invoice:**

```bash
POST /api/invoices
Content-Type: application/json

{
    "id": "RT3080",
    "createdAt": "2021-08-18",
    "paymentDue": "2021-08-19",
    "description": "Re-branding",
    "paymentTerms": 1,
    "clientName": "Jensen Huang",
    "clientEmail": "jensenh@mail.com",
    "status": "paid",
    "senderAddress": {
      "street": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "clientAddress": {
      "street": "106 Kendell Street",
      "city": "Sharrington",
      "postCode": "NR24 5WQ",
      "country": "United Kingdom"
    },
    "items": [
      {
        "name": "Brand Guidelines",
        "quantity": 1,
        "price": 1800.90,
        "total": 1800.90
      }
    ],
    "total": 1800.90
  },
```

## Contributing

If you'd like to contribute, feel free to submit a pull request.
