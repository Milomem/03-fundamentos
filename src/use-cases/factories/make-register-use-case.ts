import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository '

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  return registerUseCase
}
