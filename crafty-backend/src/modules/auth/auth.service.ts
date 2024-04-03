import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthDto, FirebaseRegisterUserDto } from './dto/auth.dto'
import { UserEntity } from '../users/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './common/jwt-const'
import { FirebaseService } from 'src/firebase/firebase.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly firebaseService: FirebaseService,
  ) {}
  async register(registerDto: CreateUserDto) {
    return await this.usersService.create(registerDto)
  }

  async fireBaseRegister(firebaseRegisterUserDto: FirebaseRegisterUserDto) {
    const { token } = firebaseRegisterUserDto
    const { userId, email, name } = await this.firebaseService.verifyUser(token)

    const user = await this.usersService.create(
      {
        username: email,
        password: name,
      },
      userId,
    )

    return user
  }

  async login(loginDto: AuthDto) {
    const user = new UserEntity(await this.usersService.validateUser(loginDto))
    const payload: JwtPayload = { user: user }
    return {
      user: user,
      token: await this.jwtService.signAsync(payload),
    }
  }

  async loginByToken(token: string) {
    const { userId } = await this.firebaseService.verifyUser(token)

    const user = new UserEntity(await this.usersService.findOne(userId))

    const payload: JwtPayload = { user: user }

    return {
      user: user,
      token: await this.jwtService.signAsync(payload),
    }
  }
}
