import { GetUsersMetricsCase } from '../get-users-metric'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInRepository()
  const useCase = new GetUsersMetricsCase(checkInsRepository)

  return useCase
}
