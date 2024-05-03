import 'dotenv/config'

import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

import { env } from './shared/config/env'

const { apiPort } = env

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription(
      'The Products API offers a platform to manage products and orders efficiently. It offers a RESTful API for creating, retrieving, updating, and deleting products and orders, as well as providing statistics on orders.',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('help', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  })

  await app.listen(apiPort, () => {
    console.log(
      '\n\x1b[34m\x1b[1m%s\x1b[0m',
      `Listening in port ${apiPort} 🚀!`,
    )
  })
}

bootstrap()
