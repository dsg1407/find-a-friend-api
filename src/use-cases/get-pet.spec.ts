import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetPetUseCase } from './get-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(async () => {
    petRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(petRepository)
  })

  it('should be able to get a pet by id', async () => {
    await petRepository.create({
      id: 'pet-123',
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      size: 'Large',
      city: 'Anytown',
      organization_id: 'org-123',
    })

    const { pet } = await sut.execute({
      petId: 'pet-123',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to get pet with wrong pet ID', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existent-pet-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
