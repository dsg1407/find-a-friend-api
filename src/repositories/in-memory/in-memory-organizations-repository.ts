import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'node:crypto'
import { Organization, Prisma } from 'prisma/generated/prisma/client'

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      city: data.city,
      phone: data.phone,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }
}
