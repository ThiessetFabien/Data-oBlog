import express from 'express';

const router = express.Router();

router.use((_, response, next) => {
  response.format = 'json';
  next();
});

export default router;
