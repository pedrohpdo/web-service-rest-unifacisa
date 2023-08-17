import express from 'express'
import { StudentController } from '../controllers/studentController'

export const studentRouter = express.Router()
studentRouter.get('/students', StudentController.findAll)
studentRouter.get('/students/search', StudentController.findByParam)
studentRouter.get('/students/:id', StudentController.findById)
studentRouter.post('/student', StudentController.insert)
studentRouter.put('/student/:id', StudentController.alter)
studentRouter.delete('/student/:id', StudentController.delete)
