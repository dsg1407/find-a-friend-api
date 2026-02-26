import { prisma } from '@/lib/prisma'
import { PetsCharacteristics, PetsRepository } from '../pets-repository'
import { Prisma } from 'prisma/generated/prisma/client'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findMany(
    city: string,
    page: number,
    perPage?: number,
    characteristics?: PetsCharacteristics,
  ) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
        ...characteristics,
      },
      take: perPage || 10,
      skip: (page - 1) * (perPage || 10),
    })

    return pets
  }
}
