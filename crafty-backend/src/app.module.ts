import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './modules/auth/common/jwt-const'
import { PostsModule } from './modules/posts/posts.module'
import { ProductsModule } from './modules/products/products.module'
import { ChatsModule } from './modules/chats/chats.module'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { WalletModule } from './modules/wallet/wallet.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('WALLET_DB_URI'), // Loaded from .ENV
      }),
    }),
    ConfigModule.forRoot(),
    PrismaModule,
    UsersModule,
    AuthModule,
    PostsModule,
    ProductsModule,
    ChatsModule,
    FirebaseModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
