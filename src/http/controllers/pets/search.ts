import { makeGetPetsByQueryUseCase } from '@/use-cases/factories/make-get-pets-by-query'
import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetParamsSchema = z.object({
    city: z.string().min(1, 'City is required'),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(10).default(10),
    species: z.string().optional(),
    breed: z.string().optional(),
    age: z.coerce.number().optional(),
    size: z.string().optional(),
  })

  const searchData = searchPetParamsSchema.parse(request.query)

  const searchPetUseCase = makeGetPetsByQueryUseCase()

  const { city, page, perPage, ...characteristics } = searchData

  const { pets } = await searchPetUseCase.execute({
    city,
    page,
    perPage,
    characteristics: { ...characteristics },
  })

  return reply.status(200).send({ pets })
}
