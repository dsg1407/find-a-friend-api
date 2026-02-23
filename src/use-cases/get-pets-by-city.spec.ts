import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetPetsByCityUseCase } from './get-pets-by-city'
import { MissingDataError } from './errors/missing-data-error'

let petRepository: InMemoryPetsRepository
let sut: GetPetsByCityUseCase

describe('Get Pets By City Use Case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetsRepository()
    sut = new GetPetsByCityUseCase(petRepository)
  })

  it('should be able to get pets by city', async () => {
    await petRepository.create({
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      size: 'Large',
      city: 'Anytown',
      organization_id: 'org-123',
    })

    await petRepository.create({
      name: 'Bingo',
      species: 'cat',
      breed: 'Siamese',
      age: 4,
      size: 'Small',
      city: 'Anytown',
      organization_id: 'org-456',
    })

    await petRepository.create({
      name: 'Bingo',
      species: 'Dog',
      breed: 'Labrador',
      age: 2,
      size: 'Large',
      city: 'Anothertown',
      organization_id: 'org-321',
    })

    const { pets } = await sut.execute({
      city: 'Anytown',
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets[0].id).toEqual(expect.any(String))
    expect(pets[1].id).toEqual(expect.any(String))
  })

  it('should not be able to get a pets with a valid city name', async () => {
    await expect(() =>
      sut.execute({
        city: '',
        page: 1,
      }),
    ).rejects.toBeInstanceOf(MissingDataError)
  })
})
