import express from 'express'
import mongoose from 'mongoose'

import { routes } from './routes/index'
import { conn } from './config/database/connection'
import {
  errorResponse,
  castErrorResponse,
  validationError,
} from './error/errorResponse'

export const app = express()
app.use(express.json())

conn.on('error', console.log.bind(console, '❌ Connection error'))

conn.once('open', () => {
  console.log('🐘 Database connected')
})

routes(app)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (err instanceof mongoose.Error.CastError) {
      castErrorResponse(res, err)
    } else if (err instanceof mongoose.Error.ValidationError) {
      validationError(res, err)
    } else {
      errorResponse(res, 'Server Error', 500, err.message)
    }
  },
)
