import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from 'prisma/generated/prisma/client'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { hash } from 'bcryptjs'
import { MissingDataError } from './errors/missing-data-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  address: string
  city: string
  phone: string
}

interface RegisterUseCaseResponse {
  organization: Organization
}

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    city,
    phone,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    if (!address || !city || !phone) {
      throw new MissingDataError()
    }

    const passwordHash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password_hash: passwordHash,
      address,
      city,
      phone,
    })

    return {
      organization,
    }
  }
}
