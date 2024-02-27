import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repository/gyms-repository'

interface CreateGymCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  logitude: number
}

interface CreateGymCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    logitude,
    latitude,
  }: CreateGymCaseRequest): Promise<CreateGymCaseResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      logitude,
    })

    return { gym }
  }
}
