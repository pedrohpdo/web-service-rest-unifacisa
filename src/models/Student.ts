import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const studentSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  mail: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', require: true },
})

export const Student = mongoose.model('Student', studentSchema)
