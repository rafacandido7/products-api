import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { OrderDocument, Order } from './schemas/orders.schema'

import { Status } from './entities'
import { OrderStatisticsDto } from './dto/order-statistics.dto'

import { GenericRepository } from '../../shared/repositories'

@Injectable()
export class OrdersRepository extends GenericRepository<OrderDocument> {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {
    super(orderModel)
  }

  async findOrderByNumber(orderNumber: number): Promise<OrderDocument | null> {
    return super.findOne({ number: orderNumber })
  }

  async findOrdersByStatus(status: Status): Promise<OrderDocument[]> {
    return super.find({ status })
  }

  async updateOrderStatus(
    orderId: string,
    newStatus: Status,
  ): Promise<OrderDocument | null> {
    return super.update(orderId, { status: newStatus, updatedAt: new Date() })
  }

  async findOrdersByTable(tableNumber: number): Promise<OrderDocument[]> {
    return super.find({ table: tableNumber })
  }

  async findOrdersByCustomer(customerId: string): Promise<OrderDocument[]> {
    return super.find({ customerId })
  }

  async calculateTotalSales(startDate: Date, endDate: Date): Promise<number> {
    const result = await super.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$total' },
        },
      },
    ])

    return result.length > 0 ? result[0].totalSales : 0
  }

  async getOrderStatistics(
    startDate: Date,
    endDate: Date,
  ): Promise<OrderStatisticsDto> {
    const orders = await super.find({
      createdAt: { $gte: startDate, $lte: endDate },
    })
    const numOrders = orders.length
    const totalSales = orders.reduce((acc, order) => acc + order.total, 0)
    const averageOrderValue = numOrders > 0 ? totalSales / numOrders : 0
    return { numOrders, totalSales, averageOrderValue }
  }
}
