// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const app = express();

// Setup body parser
app.use(express.urlencoded({ extended: true }));

// Starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));