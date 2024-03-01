import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymsCaseRequest {
  query: string
  page: number
}
interface SearchGymsCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsCaseRequest): Promise<SearchGymsCaseResponse> {
    const gyms = await this.gymRepository.SearchMany(query, page)

    return { gyms }
  }
}
