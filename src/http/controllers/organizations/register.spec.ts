import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      name: 'Organization Test',
      email: 'org.email@example.com',
      password: '123456',
      address: '123 Main St',
      city: 'Curitiba',
      phone: '99456-7890',
    })

    expect(response.statusCode).toEqual(201)
  })
})
