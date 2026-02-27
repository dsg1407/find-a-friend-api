import { makeAddNewPetUseCase } from '@/use-cases/factories/make-add-new-pet'
import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createNewPetBodySchema = z.object({
    name: z.string().max(100),
    species: z.string().max(50),
    breed: z.string().max(100).default(''),
    age: z.number().min(0).default(0),
    size: z.string().default(''),
    city: z.string().max(100),
  })

  const { sub: organizationId } = request.user

  const petData = createNewPetBodySchema.parse(request.body)

  const createNewPetUseCase = makeAddNewPetUseCase()

  await createNewPetUseCase.execute({
    ...petData,
    organizationId,
  })

  return reply.status(201).send()
}
