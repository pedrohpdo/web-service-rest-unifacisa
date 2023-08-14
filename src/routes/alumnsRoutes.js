import express from 'express';
import AlumnController from '../controllers/alumnsController.js';

const router = express.Router();
router.get('/alumn', AlumnController.findAll);
router.get('/alumn/:id', AlumnController.findById);
router.post('/alumn', AlumnController.insert);
router.put('/alumn/:id', AlumnController.alter);
router.delete('/alumn/:id', AlumnController.delete);
export default router;
