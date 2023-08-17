import { Student } from '../models/Student.js'

export class StudentController {
  static findAll = async (req, res, next) => {
    try {
      const result = await Student.find({})
        .populate({ path: 'teacher', select: 'class' })
        .exec()
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static findById = async (req, res, next) => {
    const { id } = req.params
    try {
      const result = await Student.findById(id)
        .populate({ path: 'teacher', select: 'class' })
        .exec()

      if (result !== null) {
        res.status(200).json(result)
      } else {
        res.status(404).json({
          message: 'Cannot Entity with id: ' + id,
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static findByParam = async (req, res, next) => {
    const idParam = req.query.teacherId
    try {
      const result = await Student.find({ teacher: idParam })
        .populate({ path: 'teacher', select: 'class' })
        .exec()

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static insert = async (req, res, next) => {
    const newStudent = new Student(req.body)
    try {
      await Student.create(newStudent)
      res.status(201).send(newStudent.toJSON())
    } catch (error) {
      next(error)
    }
  }

  static alter = async (req, res, next) => {
    const id = req.params.id
    try {
      await Student.findByIdAndUpdate(id, req.body)
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }

  static delete = async (req, res, next) => {
    const { id } = req.params

    try {
      await Student.findByIdAndDelete(id)
      res.status(204).json({
        message: 'Deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }
}
