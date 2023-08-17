import express from 'express'
import mongoose from 'mongoose'

import { Teacher } from '../models/Teacher.ts'

export class TeacherController {
  static findAll = async (req: express.Request, res: express.Response) => {
    try {
      const result = await Teacher.find({}).exec()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static findById = async (req: express.Request, res: express.Response) => {
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
          message: 'Bad Request',
        })
      }
    }
  }

  static insert = async (req: express.Request, res: express.Response) => {
    const newTeacher = new Teacher(req.body)

    try {
      await Teacher.create(newTeacher)
      res.status(201).send(newTeacher.toJSON())
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          error: `${error.message}`,
        })
      }
    }
  }

  static alter = async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    try {
      await Teacher.findByIdAndUpdate(id, req.body)
      res.status(200).send('fé')
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          error: `${error.message}`,
        })
      }
    }
  }

  static delete = async (req: express.Request, res: express.Response) => {
    const { id } = req.params

    try {
      await Teacher.findByIdAndDelete(id)
      res.status(204).json({
        message: 'Deleted successfully',
      })
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          error: `${error.message}`,
        })
      }
    }
  }
}
