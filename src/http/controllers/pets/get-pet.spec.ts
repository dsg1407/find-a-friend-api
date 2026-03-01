import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Search Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets', async () => {
    const organization = await prisma.organization.create({
      data: {
        name: 'Organization Test',
        email: 'org.email@example.com',
        password_hash: '123456',
        address: '123 Main St',
        city: 'Curitiba',
        phone: '99456-7890',
      },
    })

    const pet = await prisma.pet.create({
      data: {
        name: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: 2,
        size: 'Small',
        city: 'Curitiba',
        organization_id: organization.id,
      },
    })

    const response = await request(app.server).get(`/pet/${pet.id}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: 2,
        size: 'Small',
        city: 'Curitiba',
      }),
    )
  })
})
