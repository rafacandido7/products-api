import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Product {
  @Prop({ required: true, unique: true, isInteger: true, type: Number })
  EAN: number

  @Prop({ required: true, unique: true, type: String })
  SKU: string

  @Prop({ required: true, type: String })
  name: string

  @Prop({ required: true, type: Number })
  price: number

  @Prop({ required: false, type: String })
  description?: string

  @Prop({ required: false, type: String })
  category?: string

  @Prop({ required: false, type: Number })
  discount?: number

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date

  @Prop({ required: true, type: Date, default: Date.now })
  updatedAt: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product)

ProductSchema.index({ EAN: 1 })
ProductSchema.index({ SKU: 1 })
ProductSchema.index({ category: 1 })

export type ProductDocument = Product & Document
