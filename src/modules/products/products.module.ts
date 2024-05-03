import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { Product, ProductSchema } from './schemas/products.schema'
import { ProductRepository } from './product.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
