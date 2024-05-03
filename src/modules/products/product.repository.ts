import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Product, ProductDocument } from './schemas/products.schema'

import { GenericRepository } from '../../shared/repositories'

export class ProductRepository extends GenericRepository<ProductDocument> {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {
    super(productModel)
  }
}
