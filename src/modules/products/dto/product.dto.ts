import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ProductDto {
  @ApiProperty({ example: 1234567890123 })
  @IsNotEmpty()
  @IsInt()
  EAN: number

  @ApiProperty({ example: 'SKU123' })
  @IsNotEmpty()
  @IsString()
  SKU: string

  @ApiProperty({ example: 'Product Name' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ example: 10.99 })
  @IsNotEmpty()
  @IsNumber()
  price: number

  @ApiProperty({ example: 'Product description', required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ example: 'Electronics', required: false })
  @IsOptional()
  @IsString()
  category?: string

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsNumber()
  discount?: number
}
