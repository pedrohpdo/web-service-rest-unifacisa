import { ErrorResponse } from './errorResponse'

export class NotFoundPageError extends ErrorResponse {
  constructor() {
    super('Internal Server Error', 'Page Not Found', 404)
  }
}
