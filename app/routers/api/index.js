const express = require('express');
const { postArticle } = require('../../controllers/api');
const ApiError = require('../../errors/apiError');
const withErrorHandler = require('../../errors/withErrorHandler');
const logger = require('../../helpers/logger');
const { get: getSchema, post: postSchema } = require('../../validation/article.schemas');
const validate = require('../../validation/validator');

const router = express.Router();

router.use((request, _, next) => {
  logger.http(`${request.method} ${request.originalUrl}`);
  next();
});

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Retrieve a list of posts.
 *     responses:
 *       200:
 *         description: Successful response with a list of posts.
 */
router.get('/post', validate(getSchema, 'query'), withErrorHandler());

router.get('/post', validate(postSchema, 'query'), withErrorHandler());

router.post('/post/:id', validate(postSchema, 'query'), withErrorHandler(postArticle));

/**
 * Middleware for handling 404 errors.
 * @middleware
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */

router.use((_, __, next) => {
  next(new ApiError(404, 'Not Found', 'This resource does not exist'));
});

module.exports = router;
