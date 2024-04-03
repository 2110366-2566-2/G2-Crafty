import { ApiProperty } from '@nestjs/swagger'

export class FirebaseTokenDto {
  @ApiProperty({
    example: 'fshsOiJmtjNzg1NT2YCJ0eXAiOiJmdHktWlsLmNvbSIsImVtdsZS5jb2arrthjw',
    description: 'token from firebase',
  })
  token: string
}
