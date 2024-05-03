import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
} from 'class-validator'
import { Status } from '../entities'

export class OrderDto {
  @ApiProperty({ description: 'Order ID', example: '607b9975a5a484001e0f4307' })
  @IsNotEmpty()
  @IsString()
  _id: string

  @ApiProperty({ description: 'Order number', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  number: number

  @ApiProperty({
    description: 'List of products in the order',
    example: [
      JSON.stringify({
        EAN: 2,
        SKU: '2',
        name: 'Product 2',
        price: 10.99,
        description: 'Product description',
        category: 'Electronics',
        discount: 5,
        _id: '663469e29b745f54991b5f1a',
        createdAt: '2024-05-03T04:36:50.984Z',
        updatedAt: '2024-05-03T04:36:50.984Z',
        __v: 0,
      }),
      JSON.stringify({
        EAN: 3,
        SKU: '3',
        name: 'Product 3',
        price: 10.99,
        description: 'Product description',
        category: 'Electronics',
        discount: 5,
        _id: '663469e29b745f54991b5f1a',
        createdAt: '2024-05-03T04:36:50.984Z',
        updatedAt: '2024-05-03T04:36:50.984Z',
        __v: 0,
      }),
    ],
  })
  @IsNotEmpty()
  @IsString({ each: true })
  productsStamps: string[]

  @ApiProperty({
    description: 'Order status',
    enum: Status,
    example: Status.PENDING,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status

  @ApiProperty({ description: 'Order description', example: 'Special order' })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ description: 'Table number', example: 5 })
  @IsNotEmpty()
  @IsNumber()
  table: number

  @ApiProperty({ description: 'Order total', example: 21.98 })
  @IsNotEmpty()
  @IsNumber()
  total: number

  @ApiProperty({ description: 'Who accepted the order', example: 'ObjectId' })
  @IsOptional()
  @IsString()
  acceptedBy?: string

  @ApiProperty({ description: 'Who rejected the order', example: 'ObjectId' })
  @IsOptional()
  @IsString()
  rejectedBy?: string

  @ApiProperty({ description: 'Who finished the order', example: 'ObjectId' })
  @IsOptional()
  @IsString()
  finishedBy?: string

  @ApiProperty({ description: 'Who canceled the order', example: 'ObjectId' })
  @IsOptional()
  @IsString()
  canceledBy?: string

  @ApiProperty({
    description: 'Date of order acceptance',
    example: '2022-04-19T10:20:30Z',
  })
  @IsOptional()
  acceptedAt?: Date

  @ApiProperty({
    description: 'Order creation date',
    example: '2022-04-19T10:20:30Z',
  })
  @IsNotEmpty()
  createdAt: Date

  @ApiProperty({
    description: 'Order last update date',
    example: '2022-04-19T10:20:30Z',
  })
  @IsNotEmpty()
  updatedAt: Date
}
