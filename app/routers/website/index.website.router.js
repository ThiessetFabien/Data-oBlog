import express from 'express';
import postsRouter from './posts.api.router.js';
import controller from "../../controllers/website/index.website.controller.js";

const router = express.Router();

router.use((_, response, next) => {
  response.format = 'html';
  next();
});

router.get('/', controller.homePage);

router.use('/posts', postsRouter);

export default router;
