import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductsModule } from './modules/products/products.module'
import { OrdersModule } from './modules/orders/orders.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
        dbName: 'shop',
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
