const debug = require('debug')('app:datamapper');
const DbError = require('../errors/dbError');
const withErrorHandler = require('../errors/withErrorHandler');
const pool = require('./client');

/**
 * @typedef {Object} Article
 * @property {string} slug - Le slug de l'article.
 * @property {string} title - Le titre de l'article.
 * @property {string} excerpt - L'extrait de l'article.
 * @property {string} content - Le contenu de l'article.
 * @property {number} category_id - L'identifiant de la catégorie de l'article.
 */
const validPosts = [
    'id',
    'slug',
    'title', 
    'excerpt', 
    'content', 
    'created_at', 
    'updated_at',
    'category_id'
];

/**
 * @typedef {Object} DbError
 * @property {string} message - Le message d'erreur.
 */

/**
 * Datamapper pour la gestion des articles et des catégories.
 */

const datamapper = {

    /**
     * Ajoute un élément dans la base de données.
     * @param {object} update - Les données à ajouter.
     * @returns {Promise<void>} Une promesse indiquant la fin de l'opération.
     * @throws {DbError} Erreur de base de données.
     */

    async addOne(update) {
        try {
            const promises = [];
            Object.keys(update).forEach((key) => {
                if (validPosts.includes(key)) {
                    const query = {
                        text: `INSERT INTO "${key}" ("content") VALUES($1)`,
                        values: [update[key]]
                    };
                    promises.push(pool.query(query));
                }
            });  
            await Promise.all(promises);
        } catch (error) {
            throw new DbError(error.message);
        }
    },

    async allArticles(){
        try {
            const query = 'SELECT * FROM post;'
            }
        } catch (error) {
            withErrorHandler(error)
        }
    }

    /**
     * Mapper pour la gestion des articles.
     */

    articleMapper: {
        async addArticle(article) {
            try {
                const query = {
                    text: `INSERT INTO "article" (
                        "slug", "title", "excerpt", "content", "category_id"
                    ) 
                    VALUES ($1, $2, $3, $4, $5)`,
                    values: [
                        article.slug,
                        article.title,
                        article.excerpt,
                        article.content,
                        article.category_id
                    ]
                };
                await pool.query(query);
            } catch (error) {
                throw new DbError(error.message);
            }
        }
    },

    /**
    * Mapper pour la gestion des catégories.
    */

    /**
    * Ajoute une catégorie dans la base de données.
    * @param {Category} category - Les données de la catégorie à ajouter.
    * @returns {Promise<void>} Une promesse indiquant la fin de l'opération.
    * @throws {DbError} Erreur de base de données.
   */

categoryMapper: {
        async addCategory(category) {
            try {
                const query = {
                    text: `INSERT INTO "category" (
                        "route", "label"
                    )
                        VALUES ($1, $2)`,
                    values: [category.route, category.label]
                };
                await pool.query(query);
            } catch (error) {
                throw new DbError(error.message);
            }
        }
    }
};

module.exports = datamapper;
