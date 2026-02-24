import { Pet } from 'prisma/generated/prisma/client'
import {
  PetsCharacteristics,
  PetsRepository,
} from '@/repositories/pets-repository'
import { MissingDataError } from './errors/missing-data-error'

interface GetPetsByQueryUseCaseRequest {
  city: string
  page: number
  perPage?: number
  characteristics?: PetsCharacteristics
}

interface GetPetsByQueryUseCaseResponse {
  pets: Pet[]
}

export class GetPetsByQueryUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: GetPetsByQueryUseCaseRequest,
  ): Promise<GetPetsByQueryUseCaseResponse> {
    if (!data.city) {
      throw new MissingDataError()
    }

    const pets = await this.petsRepository.findMany(
      data.city,
      data.page ?? 1,
      data.perPage ?? 10,
      data.characteristics,
    )

    return {
      pets,
    }
  }
}
