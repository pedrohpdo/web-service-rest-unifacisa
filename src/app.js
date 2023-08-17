import express from 'express'
import dbConnection from './config/dbConnect.js'
import routes from './routes/index.js'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())

dbConnection.on('error', console.log.bind(console, 'connection error'))

dbConnection.once('open', function () {
  console.log('connection opened')
})

routes(app)

// eslint-disable-next-line no-unused-vars
app.use((error, req, res) => {
  if (error instanceof mongoose.Error.CastError) {
    res.status(404).json({
      error: `${error.message}`,
    })
  }
})

export default app
