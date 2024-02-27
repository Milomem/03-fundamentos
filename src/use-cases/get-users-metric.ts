import { CheckInsRepository } from '@/repository/check-ins-repository'

interface GetUsersMetricsCaseRequest {
  userId: string
}

interface GetUsersMetricsCaseResponse {
  checkInsCount: number
}

export class GetUsersMetricsCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUsersMetricsCaseRequest): Promise<GetUsersMetricsCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
