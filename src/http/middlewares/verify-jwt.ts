import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    console.log(request.headers) // Log para verificar os headers da requisição
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
