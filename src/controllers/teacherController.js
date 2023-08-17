import { Teacher } from '../models/Teacher.js'
import mongoose from 'mongoose'

export class TeacherController {
  static findAll = async (req, res) => {
    try {
      const result = await Teacher.find({}).exec()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static findById = async (req, res) => {
    const { id } = req.params
    try {
      const result = await Teacher.findById(id).exec()

      if (result !== null) {
        res.status(200).json(result)
      } else {
        res.status(200).json({
          message: 'Cannot find Entity with id ' + id,
        })
      }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res.status(400).json({
          message: 'Bad Request meu chapa',
        })
      }

      res.status(404).json({
        error: `${error.message}`,
      })
    }
  }

  static insert = async (req, res) => {
    const newTeacher = new Teacher(req.body)

    try {
      await Teacher.create(newTeacher)
      res.status(201).send(newTeacher.toJSON())
    } catch (error) {
      res.status(500).json({
        error: `${error.message}`,
      })
    }
  }

  static alter = async (req, res) => {
    const { id } = req.params
    try {
      await Teacher.findByIdAndUpdate(id, req.body)
      res.status(200).send('fé')
    } catch (error) {
      res.status(500).json({
        error: `${error.message}`,
      })
    }
  }

  static delete = async (req, res) => {
    const { id } = req.params

    try {
      await Teacher.findByIdAndDelete(id)
      res.status(204).json({
        message: 'Deleted successfully',
      })
    } catch (error) {
      res.status(404).json({
        error: `${error.message}`,
      })
    }
  }
}
