import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate a user', async () => {
    await request(app.server).post('/organizations').send({
      name: 'Organization Test',
      email: 'org.email@example.com',
      password: '123456',
      address: '123 Main St',
      city: 'Curitiba',
      phone: '99456-7890',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'org.email@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
