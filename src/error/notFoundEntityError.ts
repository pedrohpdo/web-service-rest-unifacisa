import { ErrorResponse } from './errorResponse'

export class NotFountEntityError extends ErrorResponse {
  constructor(message: string) {
    super('Not Found Entity', message, 404)
  }
}
