/**
 * Main application file.
 * This file initializes the Express application, sets up middleware, and loads routes.
 */

const express = require('express');
const bodyParser = require('body-parser');
const tablesRoutes = require('./routes/tablesRoutes');

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Routes for table operations
app.use('/api', tablesRoutes);

// Start the server
const PORT = 5000; // Define the port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
