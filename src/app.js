import express from 'express'
import mongoose from 'mongoose'

import { conn } from './config/dbConnect.js'
import { routes } from './routes/index.js'

export const app = express()
app.use(express.json())

conn.on('error', console.log.bind(console, 'connection error'))

conn.once('open', function () {
  console.log('connection opened')
})

routes(app)

app.use((error, res) => {
  if (error instanceof mongoose.Error.CastError) {
    res.status(404).json({
      error: `${error.message}`,
    })
  }
})
