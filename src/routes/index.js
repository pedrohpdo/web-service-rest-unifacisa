import express from 'express'
import { studentRouter } from './studentRoutes.js'
import { teacherRouter } from './teacherRoutes.js'

export const routes = (app) => {
  app.use(express.json(), studentRouter, teacherRouter)
}
