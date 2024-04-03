import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserEntity } from '../users/entities/user.entity'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthDto, FirebaseRegisterUserDto } from './dto/auth.dto'
import { AuthEntity } from './entity/auth.entity'
import { AuthGuard } from './guard/auth.guard'

import { FirebaseTokenDto } from './dto/firebase-token.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({ type: AuthEntity })
  async login(@Body() loginDto: AuthDto) {
    return new AuthEntity(await this.authService.login(loginDto))
  }

  @Post('login/firebase')
  @ApiCreatedResponse({ type: AuthEntity })
  async loginByToken(@Body() firebaseTokenDto: FirebaseTokenDto) {
    return new AuthEntity(
      await this.authService.loginByToken(firebaseTokenDto.token),
    )
  }

  @Post('register/firebase')
  @ApiCreatedResponse({ type: UserEntity })
  async firebaseRegister(
    @Body() firebaseRegisterUserDto: FirebaseRegisterUserDto,
  ) {
    return new UserEntity(
      await this.authService.fireBaseRegister(firebaseRegisterUserDto),
    )
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async me(@Request() req) {
    return new UserEntity(req.user)
  }
}
