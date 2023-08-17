import express from 'express'
import { Express } from 'express-serve-static-core'

import { studentRouter } from './studentRoutes'
import { teacherRouter } from './teacherRoutes'

export const routes = (app: Express) => {
  app.use(express.json(), studentRouter, teacherRouter)
}
