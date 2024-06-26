import { UserEntity } from 'src/modules/users/entities/user.entity'

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'secret',
}

export type JwtPayload = {
  user: UserEntity
}
