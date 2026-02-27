import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AddNewPetUseCase } from '../add-new-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeAddNewPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()
  const addNewPetUseCase = new AddNewPetUseCase(
    petsRepository,
    organizationsRepository,
  )

  return addNewPetUseCase
}
