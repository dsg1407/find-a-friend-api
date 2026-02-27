import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await request(app.server).post('/organizations').send({
    name: 'Organization Name',
    email: 'org@example.com',
    password: '123456',
    phone: '1234567890',
    city: 'City Name',
  })

  await prisma.organization.create({
    data: {
      name: 'Organization Name',
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      address: 'Organization Address',
      phone: '1234567890',
      city: 'City Name',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'org@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
