# Invoice Generator Application

This is a full-stack application built with the MERN stack for generating and downloading invoices in PDF format. It features user authentication, invoice management, and product tracking.

## Features

- User Authentication (JWT-based)
- Product Addition
- Invoice Management
- PDF Generation for Invoices

## Technologies Used

- **Frontend**: React, TypeScript, ViteJS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **PDF Generation**: Puppeteer

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)
- [NPM](https://www.npmjs.com/)

## Installation

Follow these steps to set up the project:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/invoice-generator-app.git
   ```

2. **Navigate into the project folder:**

   ```bash
   cd invoice-generator-app
   ```

3. **Install dependencies for both frontend and backend:**

   Navigate to the `frontend` and `backend` directories separately and install their dependencies.

   **Frontend (React):**

   ```bash
   cd frontend
   npm install
   ```

   **Backend (Node.js/Express):**

   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `backend` directory with the following environment variables:

   ```bash

   # Server Port
   PORT=<YOUR PORT>

   # MongoDB Connection URI
   MONGO_URI=<YOUR URL>

   # JWT Secret for Authentication
   JWT_SECRET=<YOUR JWT SECRET>

   ```

   Create a `.env` file in the `frontend` directory with the following environment variables:

   ```bash

   VITE_REACT_API_URI = <YOUR BACKEND URL>

   ```

5. **Set up MongoDB:**

   Ensure that MongoDB is installed and running on your machine. You can start MongoDB with the default configuration or specify a custom URI in the `.env` file.

6. **Start the backend server:**

   Navigate to the `backend` folder and run the following command:

   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:PORT`.

7. **Start the frontend development server:**

   Navigate to the `frontent` folder and run:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`.

## Usage

1. Open your browser and visit `http://localhost:5173` to access the frontend.
2. Register and log in to start adding products and generating invoices.
3. You can view and download the generated invoices as PDF files.

## API Endpoints

### Authentication

- **POST** `/auth/register` – Register a new user
- **POST** `/auth/login` – Log in with credentials to receive a JWT token

### Product

- **POST** `/product/add` – Add a product to the invoice
- **GET** `/product/invoices/:invoiceId` – Retrieve an invoice by ID and generate the PDF

### Invoice

- **GET** `/invoices` – Retrieve all invoices for the logged-in user
- **GET** `/product/invoices/:invoiceId` – Generate and download invoice as PDF

## Troubleshooting

1. **MongoDB connection error**: Ensure that MongoDB is running and the `MONGO_URI` in the `.env` file is correct.
2. **Network error (Axios)**: If you encounter a network error in the frontend, check the API endpoint in the backend or ensure CORS is properly configured.
3. **Puppeteer issues**: Make sure Puppeteer is properly installed and configured if you are using it for PDF generation.

## Contributing

Feel free to submit pull requests or report issues to improve the application.

## License

This project is licensed under the MIT License.
