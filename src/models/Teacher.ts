import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const teacherSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  class: { type: String },
  mail: { type: String },
})

export const Teacher = mongoose.model('Teacher', teacherSchema)
