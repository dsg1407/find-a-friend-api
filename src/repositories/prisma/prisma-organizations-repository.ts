import { prisma } from '@/lib/prisma'
import { OrganizationsRepository } from '../organizations-repository'
import { Prisma } from 'prisma/generated/prisma/client'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }
}
