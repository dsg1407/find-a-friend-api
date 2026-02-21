import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { RegisterUseCase } from './register'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { compare } from 'bcryptjs'
import { MissingDataError } from './errors/missing-data-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterUseCase(organizationsRepository)
  })

  it('should be able to register a new organization', async () => {
    const { organization } = await sut.execute({
      name: 'Pet Lovers',
      email: 'pet.lovers@example.com',
      password: 'password123',
      address: '123 Main St',
      city: 'Anytown',
      phone: '555-1234',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to register with an email that is already in use', async () => {
    await sut.execute({
      name: 'Pet Lovers',
      email: 'pet.lovers@example.com',
      password: 'password123',
      address: '123 Main St',
      city: 'Anytown',
      phone: '555-1234',
    })

    await expect(() =>
      sut.execute({
        name: 'Another Pet Lovers',
        email: 'pet.lovers@example.com',
        password: 'password123',
        address: '456 Another St',
        city: 'Another Town',
        phone: '555-5678',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })

  it('should hash organization password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'Pet Lovers',
      email: 'pet.lovers@example.com',
      password: 'password123',
      address: '123 Main St',
      city: 'Anytown',
      phone: '555-1234',
    })

    const isPasswordCorrectlyHashed = await compare(
      'password123',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with missing required fields', async () => {
    await expect(() =>
      sut.execute({
        name: 'Pet Lovers',
        email: 'pet.lovers@example.com',
        password: 'password123',
        address: '123 Main St',
        city: '',
        phone: '555-1234',
      }),
    ).rejects.toBeInstanceOf(MissingDataError)

    await expect(() =>
      sut.execute({
        name: 'Pet Lovers',
        email: 'pet.lovers@example.com',
        password: 'password123',
        address: '123 Main St',
        city: 'city Name',
        phone: '',
      }),
    ).rejects.toBeInstanceOf(MissingDataError)

    await expect(() =>
      sut.execute({
        name: 'Pet Lovers',
        email: 'pet.lovers@example.com',
        password: 'password123',
        address: '',
        city: 'city Name',
        phone: '555-1234',
      }),
    ).rejects.toBeInstanceOf(MissingDataError)
  })
})
