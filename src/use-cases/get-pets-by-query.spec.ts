import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { MissingDataError } from './errors/missing-data-error'
import { GetPetsByQueryUseCase } from './get-pets-by-query'

let petRepository: InMemoryPetsRepository
let sut: GetPetsByQueryUseCase

describe('Get Pets By Query Use Case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetsRepository()
    sut = new GetPetsByQueryUseCase(petRepository)
  })

  it('should be able to get pets by characteristics', async () => {
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
      name: 'Miau',
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
      city: 'Anytown',
      organization_id: 'org-321',
    })

    const { pets } = await sut.execute({
      characteristics: {
        species: 'Dog',
      },
      city: 'Anytown',
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Buddy', species: 'Dog' }),
      expect.objectContaining({ name: 'Bingo', species: 'Dog' }),
    ])
  })

  it('should not be able to get pets without a valid city', async () => {
    await expect(() =>
      sut.execute({
        characteristics: {
          age: 2,
          size: 'small',
        },
        city: '',
        page: 1,
      }),
    ).rejects.toBeInstanceOf(MissingDataError)
  })

  it('should be able to get pets without characteristics', async () => {
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
      name: 'Miau',
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
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Buddy', species: 'Dog' }),
      expect.objectContaining({ name: 'Miau', species: 'cat' }),
    ])
  })
})
