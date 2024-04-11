const ApiError = require('../../errors/apiError');
const { addOne } = require('../../dataMappers');
const withErrorHandler = require('../../errors/withErrorHandler');
const datamapper = require('../../dataMappers');

async function getArticles(request, response) {
  const posts = await datamapper.allPosts();

  return response.json(
    {
      status: 'success',
      data: {
        posts,
      },
    },

  );
}

async function postArticle(request, response) {
  try {
    const postData = request.body;

    const post = await addOne(postData);

    response.json(
      {
        status: 'success',
        data: {
          ...post,
        },
      },
    );
  } catch {
    withErrorHandler();
  }
}

module.exports = postArticle, getArticles;
