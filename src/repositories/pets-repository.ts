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
  findManyByCity(city: string, page: number, perPage?: number): Promise<Pet[]>
  searchMany(query: string, page: number, perPage?: number): Promise<Pet[]>
  findManyByCharacteristics(
    characteristics: PetsCharacteristics,
    page: number,
    perPage?: number,
  ): Promise<Pet[]>
}
