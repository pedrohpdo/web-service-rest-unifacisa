import express from 'express'
import mongoose from 'mongoose'

import { Teacher } from '../models/Teacher'

export class TeacherController {
  static findAll = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const result = await Teacher.find({}).exec()
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
      const result = await Teacher.findById(id).exec()
      if (result !== null) {
        res.status(200).json(result)
      } else {
        res.status(200).json({
          message: 'Cannot find Entity with id ' + id,
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static insert = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const newTeacher = new Teacher(req.body)
    try {
      await Teacher.create(newTeacher)
      res.status(201).send(newTeacher.toJSON())
    } catch (error) {
      next(error)
    }
  }

  static alter = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { id } = req.params
    try {
      await Teacher.findByIdAndUpdate(id, req.body)
      res.status(200).send('fé')
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
      await Teacher.findByIdAndDelete(id)
      res.status(204).json({
        message: 'Deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }
}
