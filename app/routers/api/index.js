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
 * /api/post:
 *   get:
 *     summary: Get all articles
 *     description: Retrieve all available articles.
 *     parameters:
 *       - in: query
 *         name: slug
 *         schema:
 *           type: string
 *         description: Slug of the article to search for.
 *     responses:
 *       200:
 *         description: Successfully retrieved articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid request, check your parameters.
 *       500:
 *         description: An error occurred while retrieving articles.
 */

router.get('/post', validate(getSchema, 'query'), withErrorHandler());

router.get('/post', validate(getSchema, 'query'), withErrorHandler());

/**
 * @swagger
 * /api/post/{id}:
 *   get:
 *     summary: Get a specific article by ID
 *     description: Retrieve an article by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article to retrieve.
 *     responses:
 *       200:
 *         description: Success. Returns the requested article.
 *       404:
 *         description: Article not found.
 */

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
