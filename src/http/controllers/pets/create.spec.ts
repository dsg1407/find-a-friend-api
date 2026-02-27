import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-user'

describe('Create New Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
      .post(`/add-new-pet`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: 3,
        size: 'Large',
        city: 'Anytown',
      })

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to create a new pet without authentication', async () => {
    const response = await request(app.server).post(`/add-new-pet`).send({
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      size: 'Large',
      city: 'Anytown',
    })

    expect(response.statusCode).toEqual(401)
  })
})
