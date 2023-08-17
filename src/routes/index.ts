import express from 'express'
import { Express } from 'express-serve-static-core'

import { studentRouter } from './studentRoutes.ts'
import { teacherRouter } from './teacherRoutes.ts'

export const routes = (app: Express) => {
  app.use(express.json(), studentRouter, teacherRouter)
}
