import { Prisma, Gym } from '@prisma/client'
import { FindManyNearByParams, GymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({ data })

    return gym
  }

  async SearchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: { contains: query },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async findManyNearBy({ latitude, logitude }: FindManyNearByParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * FROM gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( logitude ) - radians(${logitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }
}
