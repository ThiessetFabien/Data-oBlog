// Load environment variables
require('dotenv').config();

// Import dependencies
const debug = require('debug')('app:server');
const express = require('express');
const router = require('./app/routers');
const swagger = require('./app/services/swagger');

// Starting server
const PORT = process.env.PORT ?? 3000;

const app = express();

swagger(app);

app.use(express.json());

app.use(router);

app.listen(PORT, () => debug(`Server running on port ${PORT}`));
