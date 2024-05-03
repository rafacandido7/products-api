import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common'
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
import { OrdersService } from './orders.service'
import { OrderDocument } from './schemas/orders.schema'
import { CreateOrderDto, OrderDto, RejectOrderDto } from './dto'

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiCreatedResponse({
    type: OrderDto,
    description: 'The order has been successfully created.',
  })
  @ApiConflictResponse({
    description: 'Conflict: A product with the same EAN or SKU already exists.',
  })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderDocument> {
    return await this.ordersService.createOrder(createOrderDto)
  }

  @ApiOperation({ summary: 'Get all orders' })
  @ApiOkResponse({ type: [OrderDto], description: 'List of all orders.' })
  @Get()
  async findAll(): Promise<OrderDocument[]> {
    return await this.ordersService.getAllOrders()
  }

  @ApiOperation({ summary: 'Get a single order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiOkResponse({ type: OrderDto, description: 'Order found.' })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderDocument | null> {
    return await this.ordersService.getOrderById(id)
  }

  @ApiOperation({ summary: 'Update the status of an order' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiOkResponse({
    type: OrderDto,
    description: 'The status of the order has been successfully updated.',
  })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  @Patch('status/accepted/:id')
  async updateStatus(@Param('id') id: string): Promise<OrderDocument | null> {
    return await this.ordersService.acceptOrder(id)
  }

  @ApiOperation({ summary: 'Update the status of an order to ON_PROGRESS' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiOkResponse({
    type: OrderDto,
    description:
      'The status of the order has been successfully updated to ON_PROGRESS.',
  })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  @Patch('status/on-progress/:id')
  async markInProgress(@Param('id') id: string): Promise<OrderDocument | null> {
    return await this.ordersService.onProcessOrder(id)
  }

  @ApiOperation({ summary: 'Update the status of an order to REJECTED' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiBody({
    type: RejectOrderDto,
    description: 'Reason for rejecting the order.',
  })
  @ApiOkResponse({
    type: OrderDto,
    description:
      'The status of the order has been successfully updated to "REJECTED".',
  })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  @Patch('status/rejected/:id')
  async rejectOrder(
    @Param('id') id: string,
    @Body() rejectOrderDto: RejectOrderDto,
  ): Promise<OrderDocument | null> {
    return await this.ordersService.rejectOrder(id, rejectOrderDto)
  }

  @ApiOperation({ summary: 'Update the status of an order to FINISHED' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiOkResponse({
    type: OrderDto,
    description:
      'The status of the order has been successfully updated to "FINISHED".',
  })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  @Patch('status/finished/:id')
  async markFinished(@Param('id') id: string): Promise<OrderDocument | null> {
    return await this.ordersService.finishOrder(id)
  }

  @ApiOperation({ summary: 'Update the status of an order to CANCELED' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiOkResponse({
    type: OrderDto,
    description:
      'The status of the order has been successfully updated to "CANCELED".',
  })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  @Patch('status/canceled/:id')
  async cancelOrder(@Param('id') id: string): Promise<OrderDocument | null> {
    return await this.ordersService.cancelOrder(id)
  }
}
