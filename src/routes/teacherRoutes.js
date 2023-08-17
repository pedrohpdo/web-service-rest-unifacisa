import express from 'express'
import teacherController from '../controllers/teacherController.js';

const router = express.Router()
router.get('/teacher', teacherController.findAll)
router.get('/teacher/:id', teacherController.findById)
router.post('/teacher', teacherController.insert)
router.put('/teacher/:id', teacherController.alter)
router.delete('/teacher/:id', teacherController.delete)

export default router
