import mongoose from 'mongoose'

mongoose.connect(
  process.env.URI_CONNECTION_DB || 'mongodb://127.0.0.1:27017/test',
)

export const conn = mongoose.connection
