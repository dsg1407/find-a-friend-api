import { Pet } from 'prisma/generated/prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { MissingDataError } from './errors/missing-data-error'

interface GetPetsByCityUseCaseRequest {
  city: string
  page: number
  perPage?: number
}

interface GetPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class GetPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: GetPetsByCityUseCaseRequest,
  ): Promise<GetPetsByCityUseCaseResponse> {
    if (!data.city) {
      throw new MissingDataError()
    }

    const pets = await this.petsRepository.findManyByCity(
      data.city,
      data.page ?? 1,
      data.perPage ?? 10,
    )

    return {
      pets,
    }
  }
}
