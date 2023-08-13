import express from 'express';
import AlumnController from '../controllers/alumnsController.js';

const router = express.Router();
router.get('/', AlumnController.findAll);
router.get('/:id', AlumnController.findById);
router.post('/', AlumnController.insert);
router.put('/:id', AlumnController.alter);
router.delete('/:id', AlumnController.delete);
export default router;
