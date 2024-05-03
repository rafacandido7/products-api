import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { OrderStatisticsDto } from './dto/order-statistics.dto'
import { OrdersRepository } from './orders.repository'
import { Status } from './entities'
import { OrderDocument } from './schemas/orders.schema'
import { Types } from 'mongoose'
import { ProductsService } from '../products/products.service'
import { RejectOrderDto } from './dto'

@Injectable()
export class OrdersService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly orderRepository: OrdersRepository,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderDocument> {
    const { productsIds, ...dto } = createOrderDto

    const products = await this.productsService.getProductsByIds(productsIds)

    const total = products.reduce((acc, product) => {
      return acc + product.price
    }, 0)

    return this.orderRepository.create({
      ...dto,
      productsStamps: products,
      total,
    })
  }

  async getAllOrders(): Promise<OrderDocument[]> {
    return this.orderRepository.findAll()
  }

  async getOrderById(id: string | Types.ObjectId): Promise<OrderDocument> {
    const order = await this.orderRepository.findById(new Types.ObjectId(id))

    if (!order) {
      throw new NotFoundException('Order not found.')
    }

    return order
  }

  async updateOrderStatus(
    id: string,
    status: Status,
  ): Promise<OrderDocument | null> {
    return this.orderRepository.updateOrderStatus(id, status)
  }

  async deleteOrder(id: string | Types.ObjectId): Promise<OrderDocument> {
    return this.orderRepository.delete(id)
  }

  async getOrderStatistics(
    startDate: Date,
    endDate: Date,
  ): Promise<OrderStatisticsDto> {
    return await this.orderRepository.getOrderStatistics(startDate, endDate)
  }

  async acceptOrder(id: string): Promise<OrderDocument | null> {
    const order = await this.orderRepository.findById(new Types.ObjectId(id))

    if (!order) {
      throw new NotFoundException('Order not found.')
    }

    if (
      order.status === Status.CANCELED ||
      order.status === Status.FINISHED ||
      order.status === Status.REJECTED
    ) {
      throw new ConflictException(
        `Cannot accept an order that has been ${order.status}.`,
      )
    }

    const updatedOrder = await this.orderRepository.findByIdAndUpdate(id, {
      status: Status.ACCEPTED,
      acceptedAt: new Date(),
      updatedAt: new Date(),
    })

    return updatedOrder
  }

  async onProcessOrder(id: string): Promise<OrderDocument | null> {
    const order = await this.orderRepository.findById(id)

    if (!order) {
      throw new NotFoundException('Order not found.')
    }

    if (order.status !== Status.ACCEPTED) {
      throw new ConflictException(
        'Cannot process order with a status different of "ACCEPTED".',
      )
    }

    const updatedOrder = await this.orderRepository.findByIdAndUpdate(id, {
      status: Status.ON_PROGRESS,
      updatedAt: new Date(),
    })

    return updatedOrder
  }

  async finishOrder(id: string): Promise<OrderDocument | null> {
    const order = await this.orderRepository.findById(id)

    if (!order) {
      throw new NotFoundException('Order not found.')
    }

    if (order.status === Status.CANCELED || order.status === Status.REJECTED) {
      throw new ConflictException('Cannot finish a canceled or rejected order.')
    }

    if (order.status !== Status.ON_PROGRESS) {
      throw new ConflictException(
        'Cannot finish an order that is not "ON_PROGRESS".',
      )
    }

    const updatedOrder = await this.orderRepository.findByIdAndUpdate(id, {
      status: Status.FINISHED,
      finishedAt: new Date(),
      updatedAt: new Date(),
    })

    return updatedOrder
  }

  async rejectOrder(
    id: string,
    rejectedReasonDto: RejectOrderDto,
  ): Promise<OrderDocument | null> {
    const { rejectedReason } = rejectedReasonDto

    const order = await this.orderRepository.findById(id)

    if (!order) {
      throw new NotFoundException('Order not found.')
    }

    if (order.status === Status.CANCELED || order.status === Status.FINISHED) {
      throw new ConflictException('Cannot reject a canceled or finished order.')
    }

    if (![Status.ACCEPTED, Status.PENDING].includes(order.status)) {
      throw new ConflictException(
        'Cannot reject an order that is not "ACCEPTED" or "PENDING".',
      )
    }

    const updatedOrder = await this.orderRepository.findByIdAndUpdate(id, {
      status: Status.REJECTED,
      rejectedAt: new Date(),
      updatedAt: new Date(),
      rejectedReason,
    })

    return updatedOrder
  }

  async cancelOrder(id: string): Promise<OrderDocument | null> {
    const updatedOrder = await this.orderRepository.findByIdAndUpdate(id, {
      status: Status.CANCELED,
      canceledAt: new Date(),
      updatedAt: new Date(),
    })

    return updatedOrder
  }
}
