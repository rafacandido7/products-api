import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class OrderStatisticsDto {
  @ApiProperty({ description: 'Número total de pedidos', example: 10 })
  @IsNumber()
  numOrders: number

  @ApiProperty({ description: 'Total de vendas em dinheiro', example: 1000.5 })
  @IsNumber()
  totalSales: number

  @ApiProperty({ description: 'Valor médio de cada pedido', example: 100.05 })
  @IsNumber()
  averageOrderValue: number
}
