import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const teacherSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String },
  surname: { type: String },
  class: { type: String },
  mail: { type: String },
})

const teacher = mongoose.model('Teacher', teacherSchema)

export default teacher
