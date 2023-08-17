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

app.use((error, res) => {
  if (error instanceof mongoose.Error.CastError) {
    res.status(404).json({
      error: `${error.message}`,
    })
  }
})
