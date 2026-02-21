import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { AddNewPetUseCase } from './add-new-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { MissingDataError } from './errors/missing-data-error'

let organizationRepository: InMemoryOrganizationsRepository
let petRepository: InMemoryPetsRepository
let sut: AddNewPetUseCase

describe('Add New Pet Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new AddNewPetUseCase(petRepository, organizationRepository)
  })

  it('should be able to register a new pet', async () => {
    await organizationRepository.create({
      id: 'org-123',
      name: 'Pet Lovers',
      email: 'pet.lovers@example.com',
      password_hash: 'passwordHashed',
      address: '123 Main St',
      city: 'Anytown',
      phone: '555-1234',
    })

    const { pet } = await sut.execute({
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      size: 'Large',
      city: 'Anytown',
      organization_id: 'org-123',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a pet with a non-existent organization', async () => {
    await expect(() =>
      sut.execute({
        name: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: 3,
        size: 'Large',
        city: 'Anytown',
        organization_id: 'org-123',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to register a pet with missing required fields', async () => {
    await organizationRepository.create({
      id: 'org-123',
      name: 'Pet Lovers',
      email: 'pet.lovers@example.com',
      password_hash: 'passwordHashed',
      address: '123 Main St',
      city: 'Anytown',
      phone: '555-1234',
    })

    await expect(() =>
      sut.execute({
        name: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: 3,
        size: 'Large',
        city: '',
        organization_id: 'org-123',
      }),
    ).rejects.toBeInstanceOf(MissingDataError)
  }) // Implementar no registro de orgs tb
})
