import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { ProductDocument } from 'src/modules/products/schemas/products.schema'

import { Status } from '../entities'

// isnt the best moddeling :/
@Schema()
export class Order {
  @Prop({ required: true, type: Number, unique: true })
  number: number

  @Prop({ required: true })
  productsStamps: ProductDocument[]

  @Prop({ required: false, enum: Status, default: Status.PENDING })
  status: Status

  @Prop({ required: false })
  description?: string

  @Prop({ required: true, type: Number })
  table: number

  @Prop({ required: true, type: Number })
  total: number

  // to populate and implement after the user/auth module and validation pipe
  @Prop({ required: false })
  acceptedBy?: string

  @Prop({ required: false })
  rejectedBy?: string

  @Prop({ required: false })
  finishedBy?: string

  @Prop({ required: false })
  canceledBy?: string

  @Prop({ required: false, type: Date })
  acceptedAt?: Date

  @Prop({ required: false, type: Date })
  rejectedAt?: Date

  @Prop({ required: false, type: Date })
  finishedAt?: Date

  @Prop({ required: false, type: Date })
  canceledAt?: Date

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date

  @Prop({ required: true, type: Date, default: Date.now })
  updatedAt: Date

  @Prop({ required: false, type: String })
  rejectedReason?: string
}

export const OrderSchema = SchemaFactory.createForClass(Order)

OrderSchema.index({ number: 1 })
OrderSchema.index({ table: 1 })
OrderSchema.index({ status: 1 })

export type OrderDocument = Order & Document
