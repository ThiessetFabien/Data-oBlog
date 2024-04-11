const Joi = require('joi');

const validator = Joi.string().required();

const categorySchema = Joi.object({
  route: validator,
  label: validator,
});

const articleSchema = Joi.object({
  category: validator,
  slug: validator,
  title: validator,
  excerpt: validator,
  content: validator,
});

module.exports = {
  categorySchema,
  articleSchema,
};
