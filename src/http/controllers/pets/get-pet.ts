import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet'
import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    id: z.uuid('Invalid pet ID format'),
  })

  const { id: petId } = getPetParamsSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  const pet = await getPetUseCase.execute({
    petId,
  })

  return reply.status(200).send(pet)
}
