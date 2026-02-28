import { CustomErrors } from './custom-errors'

export class OrganizationAlreadyExistsError extends CustomErrors {
  constructor() {
    super('E-mail already exists.')
  }
}
