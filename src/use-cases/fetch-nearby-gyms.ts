import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repository/gyms-repository'

interface FetchNearByGymsCaseRequest {
  userLatitude: number
  userLongitude: number
}
interface FetchNearByGymsCaseResponse {
  gyms: Gym[]
}

export class FetchNearByGymsUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLongitude,
    userLatitude,
  }: FetchNearByGymsCaseRequest): Promise<FetchNearByGymsCaseResponse> {
    const gyms = await this.gymRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
