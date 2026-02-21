import { PetsCharacteristics, PetsRepository } from '../pets-repository'
import { Pet, Prisma } from 'prisma/generated/prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      species: data.species,
      breed: data.breed,
      age: data.age,
      size: data.size,
      city: data.city,
      created_at: new Date(),
      organization_id: data.organization_id,
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCity(city: string, page: number, perPage = 10) {
    return this.items
      .filter(
        (item) => item.city.toLocaleLowerCase() === city.toLocaleLowerCase(),
      )
      .slice((page - 1) * perPage, page * perPage)
  }

  async searchMany(query: string, page: number, perPage = 10) {
    const normalizedQuery = query.toLowerCase()

    return this.items
      .filter((item) => {
        return (
          item.name.toLowerCase().includes(normalizedQuery) ||
          item.species.toLowerCase().includes(normalizedQuery) ||
          item.breed.toLowerCase().includes(normalizedQuery) ||
          item.size.toLowerCase().includes(normalizedQuery) ||
          item.age.toString().includes(normalizedQuery)
        )
      })
      .slice((page - 1) * perPage, page * perPage)
  }

  async findManyByCharacteristics(
    characteristics: PetsCharacteristics,
    page: number,
    perPage = 10,
  ) {
    return this.items
      .filter((item) =>
        Object.entries(characteristics).every(([key, value]) => {
          if (value === undefined) return true
          return item[key as keyof typeof item] === value
        }),
      )
      .slice((page - 1) * perPage, page * perPage)
  }
}
