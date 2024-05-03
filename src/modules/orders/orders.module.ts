import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OrdersService } from './orders.service'

import { OrdersController } from './orders.controller'

import { OrdersRepository } from './orders.repository'

import { Order, OrderSchema } from './schemas/orders.schema'

import { ProductsModule } from '../products/products.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
