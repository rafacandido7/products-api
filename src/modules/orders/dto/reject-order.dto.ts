import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class RejectOrderDto {
  @ApiProperty({
    description: 'Reason for rejecting the order.',
    example: 'Reason for rejecting the order.',
  })
  @IsNotEmpty()
  @IsString()
  rejectedReason: string
}
