import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { FirebaseModule } from 'src/firebase/firebase.module'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, FirebaseModule],
})
export class AuthModule {}
