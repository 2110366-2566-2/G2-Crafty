// src/main.ts

import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common'
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api/v2')

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  const config = new DocumentBuilder()
    .setTitle('crafty API')
    .setDescription('The API for crafty application')
    .setVersion('0.9')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = process.env.PORT || 5000

  Logger.log(`Listening on port ${port}`, 'Bootstrap')

  await app.listen(port, '0.0.0.0')
}
bootstrap()
