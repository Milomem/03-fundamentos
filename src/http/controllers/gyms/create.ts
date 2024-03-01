import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGymsUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    logitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, logitude } =
    createGymBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymsUseCase()

  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    logitude,
  })

  return reply.status(201).send()
}
