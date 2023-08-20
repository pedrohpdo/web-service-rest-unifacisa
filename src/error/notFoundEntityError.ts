import { ErrorResponse } from './errorResponse'

export class NotFountEntityError extends ErrorResponse {
  constructor(id: string) {
    super('Not Found Entity Error', `Cannot find Student with id: ${id}`, 422)
  }
}
