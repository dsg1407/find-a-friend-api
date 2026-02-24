import { Pet, Prisma } from 'prisma/generated/prisma/client'

export interface PetsCharacteristics {
  species?: string
  breed?: string
  age?: number
  size?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findMany(
    city: string,
    page: number,
    perPage?: number,
    characteristics?: PetsCharacteristics,
  ): Promise<Pet[]>
}
