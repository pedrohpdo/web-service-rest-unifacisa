import express from 'express'
import { TeacherController } from '../controllers/teacherController.js'

export const teacherRouter = express.Router()
teacherRouter.get('/teachers', TeacherController.findAll)
teacherRouter.get('/teachers/:id', TeacherController.findById)
teacherRouter.post('/teacher', TeacherController.insert)
teacherRouter.put('/teacher/:id', TeacherController.alter)
teacherRouter.delete('/teacher/:id', TeacherController.delete)
