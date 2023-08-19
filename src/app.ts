import express from 'express'
import mongoose from 'mongoose'

import { routes } from './routes/index'
import { conn } from './config/database/connection'
import { ErrorResponse } from './error/errorResponse'

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
      new ErrorResponse(
        'Cast Error',
        `Unprocessable path: ${err.path} for value: ${err.value}`,
        422,
      ).buildResponse(res)
    } else if (err instanceof mongoose.Error.ValidationError) {
      new ErrorResponse(
        'Validation Error',
        'Cannot create entity. Some data is required',
        422,
      ).buildValidationResponse(res, err)
    } else {
      new ErrorResponse(
        'Bad request',
        'Internal Server Error',
        500,
      ).buildResponse(res)
    }
  },
)
