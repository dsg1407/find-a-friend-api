import { CustomErrors } from './custom-errors'

export class ResourceNotFoundError extends CustomErrors {
  constructor() {
    super('Resource not found.')
  }
}
