import express from 'express'
import mongoose from 'mongoose'

import { routes } from './routes/index'
import { conn } from './config/database/connection'
import { ErrorResponse } from './error/errorResponse'
import { NotFountEntityError } from './error/notFoundEntityError'
import { NotFoundPageError } from './error/notFoundPageError'

export const app = express()
app.use(express.json())

conn.on('error', console.log.bind(console, '❌ Connection error'))

conn.once('open', () => {
  console.log('🐘 Database connected')
})

routes(app)
app.use((req: express.Request, res: express.Response) => {
  new NotFoundPageError().buildResponse(res)
})

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
    } else if (err instanceof NotFountEntityError) {
      new NotFountEntityError(err.message).buildResponse(res)
    } else if (err instanceof NotFoundPageError) {
      new NotFoundPageError().buildResponse(res)
    } else {
      new ErrorResponse(
        'Server Error',
        'Internal Server Error',
        500,
      ).buildResponse(res)
    }
  },
)
