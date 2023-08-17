import express from 'express'
import StudentController from '../controllers/studentController.js'

const router = express.Router()
router.get('/student', StudentController.findAll)
router.get('/student/search', StudentController.findByParam)
router.get('/student/:id', StudentController.findById)
router.post('/student', StudentController.insert)
router.put('/student/:id', StudentController.alter)
router.delete('/student/:id', StudentController.delete)
export default router
