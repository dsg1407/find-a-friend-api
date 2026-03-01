import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetsByQueryUseCase } from '../get-pets-by-query'

export function makeGetPetsByQueryUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getPetsByQueryUseCase = new GetPetsByQueryUseCase(petsRepository)

  return getPetsByQueryUseCase
}
