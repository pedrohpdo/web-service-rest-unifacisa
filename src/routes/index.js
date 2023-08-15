import express from 'express';
import alumn from './alumnsRoutes.js';
import professors from './professorRoutes.js';

const routes = function(app) {
    app.use(
        express.json(),
        alumn,
        professors
    );  
};

export default routes;