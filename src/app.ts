import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { ZodError, z } from 'zod'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

// registro rotas

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: z.treeifyError(error),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO Here you could integrate with a logging service like Sentry/DataDog/etc
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
