import mongoose from 'mongoose'

mongoose.connect(process.env.URI_CONNECTION_DB)

export const conn = mongoose.connection
