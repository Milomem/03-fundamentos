import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotExistsError } from './errors/resource-not-exist'
import dayjs from 'dayjs'
import { LateValidateCheckInError } from './errors/lates-check-in-validation-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private validateCheckInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.validateCheckInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotExistsError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateValidateCheckInError()
    }

    checkIn.validated_at = new Date()

    await this.validateCheckInsRepository.save(checkIn)

    return { checkIn }
  }
}
