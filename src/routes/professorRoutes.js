import express from 'express';
import ProfessorController from '../controllers/ProfessorsController.js';

const router = express.Router();
router.get('/prof', ProfessorController.findAll);
router.get('prof/:id', ProfessorController.findById);
router.post('/prof', ProfessorController.insert);
router.put('/prof/:id', ProfessorController.alter);
router.delete('/prof/:id', ProfessorController.delete);

export default router;
