import express from 'express'
import studentRoutes from './studentRoutes.js'
import teacherRoutes from './teacherRoutes.js'

const routes = (app) => {
  app.use(express.json(), studentRoutes, teacherRoutes)
}

export default routes
