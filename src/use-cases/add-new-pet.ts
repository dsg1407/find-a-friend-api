import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Pet } from 'prisma/generated/prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { MissingDataError } from './errors/missing-data-error'

interface AddNewPetUseCaseRequest {
  name: string
  species: string
  breed: string
  age: number
  size: string
  city: string
  organization_id: string
}

interface AddNewPetUseCaseResponse {
  pet: Pet
}

export class AddNewPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute(
    data: AddNewPetUseCaseRequest,
  ): Promise<AddNewPetUseCaseResponse> {
    if (!data.city) {
      throw new MissingDataError()
    }

    const organization = await this.organizationsRepository.findById(
      data.organization_id,
    )

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name: data.name,
      species: data.species,
      breed: data.breed,
      age: data.age,
      size: data.size,
      city: data.city,
      organization_id: data.organization_id,
    })

    return {
      pet,
    }
  }
}
