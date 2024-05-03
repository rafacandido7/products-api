import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger'
import { ProductsService } from './products.service'

import { Product } from './schemas/products.schema'

import { CreateProductDto, ProductDto, UpdateProductDto } from './dto'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({
    type: ProductDto,
    description: 'The product has been successfully created.',
  })
  @ApiConflictResponse({
    description: 'Conflict: A product with the same EAN or SKU already exists.',
  })
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return await this.productsService.create(createProductDto)
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({ type: [ProductDto], description: 'List of all products.' })
  @Get()
  async findAll(): Promise<ProductDto[]> {
    return await this.productsService.findAll()
  }

  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiOkResponse({ type: ProductDto, description: 'Product found.' })
  @ApiNotFoundResponse({ description: 'Product not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductDto> {
    return await this.productsService.findOne(id)
  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponse({
    type: ProductDto,
    description: 'The product has been successfully updated.',
  })
  @ApiNotFoundResponse({ description: 'Product not found.' })
  @ApiConflictResponse({
    description: 'Conflict: A product with the same EAN or SKU already exists.',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return await this.productsService.update(id, updateProductDto)
  }

  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiOkResponse({
    type: ProductDto,
    description: 'The product has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Product not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ProductDto> {
    return await this.productsService.remove(id)
  }
}
