import { CustomErrors } from './custom-errors'

export class MissingDataError extends CustomErrors {
  constructor() {
    super('Missing required data.')
  }
}
