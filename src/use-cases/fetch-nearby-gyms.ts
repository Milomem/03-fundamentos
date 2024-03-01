import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

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
      logitude: userLongitude,
    })

    return { gyms }
  }
}
