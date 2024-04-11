const express = require("express");
const { postArticle } = require('../../controllers/api/');
const ApiError = require('../../errors/apiError');
const withErrorHandler = require('../../errors/withErrorHandler.js');
const logger = require('../../helpers/logger.js');
const { get: getSchema, post: postSchema } = require('../../validation/article.schemas.js');
const validate = require('../../validation/validator.js');

const router = express.Router();

router.use((request, _, next) => {
    logger.http(`${request.method} ${request.originalUrl}`);
    next();
});

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

router.get('/post', validate(this.getSchema, 'query'), withErrorHandler())
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