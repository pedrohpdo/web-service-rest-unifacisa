import express from 'express'
import { Error } from 'mongoose'

export const errorResponse = async (
  res: express.Response,
  nameError: string,
  statusCode: number,
  messageError: string,
) => {
  await res.status(statusCode).json({
    status: statusCode,
    error: nameError,
    message: messageError,
    timestamp: new Date(),
  })
}

export const castErrorResponse = async (
  res: express.Response,
  err: Error.CastError,
) => {
  await res.status(422).json({
    status: 422,
    error: 'Cast Error',
    message: `Cast key: ${err.path} failed for value ${err.value}`,
    timestamp: new Date(),
  })
}

export const validationError = async (
  res: express.Response,
  err: Error.ValidationError,
) => {
  const pathError: { path: string; status: any }[] = []
  const errors = Object.values(err.errors).forEach((error) => {
    pathError.push({
      path: error.path,
      status: error.kind,
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
