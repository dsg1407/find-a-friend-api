import { CustomErrors } from './custom-errors'

export class InvalidCredentialsError extends CustomErrors {
  constructor() {
    super('Invalid credentials.')
  }
}
