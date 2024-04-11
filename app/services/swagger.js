const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
  info: {
    version: '0.0.1',
    title: 'Oblog API',
    license: {
      name: 'BSD',
    },
  },
  baseDir: '../../',
  filesPattern: './**/*.js',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
};

function initSwagger(app) {
  expressJSDocSwagger(app)(options);
}

module.exports = initSwagger;
