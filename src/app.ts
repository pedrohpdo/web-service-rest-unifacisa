import express from 'express'
import mongoose from 'mongoose'

import { routes } from './routes/index'
import { conn } from './config/database/connection'

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
      res.status(422).json({ message: `${err.message}` })
    } else if (err instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(err.errors).map((erro) => erro.message)
      res.status(400).json({ message: `${errors}` })
    } else {
      res.status(500).json({ error: `${err.name}` })
    }
  },
)
