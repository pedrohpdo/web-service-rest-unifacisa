import express from 'express'

import { Student } from '../models/Student'
import { NotFountEntityError } from '../error/notFoundEntityError'

export class StudentController {
  static findAll = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const result = await Student.find({})
        .populate({ path: 'teacher', select: 'class' })
        .exec()
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static findById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { id } = req.params
    try {
      const result = await Student.findById(id)
        .populate({ path: 'teacher', select: 'class' })
        .exec()

      if (result === null) {
        throw new NotFountEntityError(id)
      }
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static findByParam = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const idParam: any = req.query.teacherId
    try {
      const result = await Student.find({ teacher: idParam })
        .populate({ path: 'teacher', select: 'class' })
        .exec()

      if (!result.length) {
        throw new NotFountEntityError(idParam)
      }

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static insert = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const newStudent = new Student(req.body)
    try {
      await Student.create(newStudent)
      res.status(201).send(newStudent.toJSON())
    } catch (error) {
      next(error)
    }
  }

  static alter = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const id = req.params.id
    try {
      await Student.findByIdAndUpdate(id, req.body)
      res.status(200).json({
        status: 200,
        message: 'Student updated successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  static delete = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { id } = req.params
    try {
      if ((await Student.findById(id).exec()) === null) {
        throw new NotFountEntityError(id)
      }
      await Student.findByIdAndDelete(id)
      res.status(204).json({
        message: 'Deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }
}
