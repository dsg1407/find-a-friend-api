import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

let organizationRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationRepository.create({
      name: 'Pet Lovers',
      email: 'pet.lovers@example.com',
      password_hash: await hash('password123', 6),
      address: '123 Main St',
      city: 'Anytown',
      phone: '555-1234',
    })

    const { organization } = await sut.execute({
      email: 'pet.lovers@example.com',
      password: 'password123',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'organization@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationRepository.create({
      name: 'Pet Lovers',
      email: 'pet.lovers@example.com',
      password_hash: await hash('password123', 6),
      address: '123 Main St',
      city: 'Anytown',
      phone: '555-1234',
    })

    await expect(() =>
      sut.execute({
        email: 'pet.lovers@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
