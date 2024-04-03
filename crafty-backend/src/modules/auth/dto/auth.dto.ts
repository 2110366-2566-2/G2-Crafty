import { ApiProperty } from '@nestjs/swagger'
import { MinLength } from 'class-validator'
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto'

export class AuthDto {
  @MinLength(2)
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  username: string

  @MinLength(4)
  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
  })
  password: string
}

export class FirebaseRegisterUserDto
  implements Omit<Omit<CreateUserDto, 'username'>, 'password'>
{
  @ApiProperty({
    example: 'fshsOiJmtjNzg1NT2YCJ0eXAiOiJmdHktWlsLmNvbSIsImVtdsZS5jb2arrthjw',
    description: 'token from firebase',
  })
  token: string
}
