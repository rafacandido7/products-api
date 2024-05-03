import { ApiProperty, PickType } from '@nestjs/swagger'

import { OrderDto } from './order.dto'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateOrderDto extends PickType(OrderDto, [
  'number',
  'table',
  'status',
  'description',
]) {
  @ApiProperty({
    description: 'List of products IDs in the order',
    example: ['663469e29b745f54991b5f1a', '663469cf9b745f54991b5f16'],
  })
  @IsNotEmpty()
  @IsString({
    each: true,
  })
  productsIds: string[]
}
