export class MissingDataError extends Error {
  constructor() {
    super('Missing required data.')
  }
}
