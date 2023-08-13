import express from 'express';
import alumn from './alumnsRoutes.js';

const routes = function(app) {
  app.use(
    express.json(),
    alumn
  )  
};

export default routes;