import express from 'express'
import mongoose from 'mongoose'

export class ErrorResponse extends Error {
  status: number

  constructor(name: string, message: string, status: number) {
    super()
    this.name = name
    this.message = message
    this.status = status
  }

  buildResponse = async (res: express.Response) => {
    res.status(this.status).json({
      status: this.status,
      name: this.name,
      message: this.message,
      timestamp: new Date(),
    })
  }

  buildValidationResponse = async (
    res: express.Response,
    err: mongoose.Error.ValidationError,
  ) => {
    const pathError: { field: string; fieldStatus: string }[] = []

    Object.values(err.errors).forEach((error) => {
      pathError.push({
        field: error.path,
        fieldStatus: error.kind,
      })
    })

    res.status(400).json({
      status: 400,
      name: 'Validation Error',
      message: 'Cannot create entity. Some data is required',
      details: pathError,
      timestamp: new Date(),
    })
  }
}
