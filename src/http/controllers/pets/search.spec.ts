import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Search Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

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

    await prisma.pet.createMany({
      data: [
        {
          name: 'Buddy',
          species: 'Dog',
          breed: 'Golden Retriever',
          age: 2,
          size: 'Small',
          city: 'Curitiba',
          organization_id: organization.id,
        },
        {
          name: 'Bingo',
          species: 'Dog',
          breed: 'Labrador',
          age: 3,
          size: 'Small',
          city: 'Anytown',
          organization_id: organization.id,
        },
        {
          name: 'Garfield',
          species: 'Cat',
          breed: 'Persian',
          age: 2,
          size: 'Large',
          city: 'Curitiba',
          organization_id: organization.id,
        },
      ],
    })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets', async () => {
    const response = await request(app.server).get(`/search`).query({
      city: 'Curitiba',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Buddy', species: 'Dog' }),
        expect.objectContaining({ name: 'Garfield', species: 'Cat' }),
      ]),
    )
  })

  it('should be able to search pets with filters', async () => {
    const test_1 = await request(app.server).get(`/search`).query({
      city: 'Curitiba',
      species: 'Dog',
    })

    expect(test_1.statusCode).toEqual(200)
    expect(test_1.body.pets).toHaveLength(1)
    expect(test_1.body.pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Buddy' })]),
    )

    const test_2 = await request(app.server).get(`/search`).query({
      city: 'Curitiba',
      age: 2,
    })

    expect(test_2.statusCode).toEqual(200)
    expect(test_2.body.pets).toHaveLength(2)
    expect(test_2.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Buddy' }),
        expect.objectContaining({ name: 'Garfield' }),
      ]),
    )
  })

  it('should not be able to search pets without a city', async () => {
    const response = await request(app.server).get(`/search`).query({
      city: '',
    })

    expect(response.statusCode).toEqual(400)
  })
})
