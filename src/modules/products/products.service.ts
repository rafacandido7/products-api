import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common'
import { Types } from 'mongoose'

import { ProductRepository } from './product.repository'

import { Product } from './schemas/products.schema'

import { CreateProductDto, UpdateProductDto } from './dto'

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.find({
      $or: [{ EAN: createProductDto.EAN }, { SKU: createProductDto.SKU }],
    })

    if (existingProduct.length > 0) {
      throw new ConflictException(
        'Já existe um produto com o mesmo EAN ou SKU.',
      )
    }

    return await this.productRepository.create(createProductDto)
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll()
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOneById(id)
    if (!product) {
      throw new NotFoundException('Produto não encontrado.')
    }
    return product
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.productRepository.findOneById(id)

    if (!existingProduct) {
      throw new NotFoundException('Produto não encontrado.')
    }

    const existingProducts = await this.productRepository.find({
      $and: [
        { _id: { $ne: id } },
        { $or: [{ EAN: updateProductDto.EAN }, { SKU: updateProductDto.SKU }] },
      ],
    })

    if (existingProducts.length > 0) {
      throw new ConflictException(
        'Já existe um produto com o mesmo EAN ou SKU.',
      )
    }

    return await this.productRepository.update(id, {
      ...updateProductDto,
      updatedAt: new Date(),
    })
  }

  async remove(id: string | Types.ObjectId): Promise<Product> {
    const product = await this.productRepository.delete(id)
    if (!product) {
      throw new NotFoundException('Produto não encontrado.')
    }
    return product
  }

  async getProductsByIds(
    productsIds: string[] | Types.ObjectId[],
  ): Promise<Product[]> {
    return await this.productRepository.find({ _id: { $in: productsIds } })
  }

  async validateProductsByIds(productsIds: string[]): Promise<boolean> {
    const ids = productsIds.map((id) => new Types.ObjectId(id))

    const products = await this.productRepository.find({
      _id: { $in: ids },
    })

    const foundIds = products.map((product) => product._id.toString())
    const missingIds = productsIds.filter((id) => !foundIds.includes(id))

    if (missingIds.length > 0) {
      throw new NotFoundException(
        `Produtos não encontrados: ${missingIds.join(', ')}`,
      )
    }

    return true
  }
}
