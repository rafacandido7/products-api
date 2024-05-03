import { plainToInstance } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator'

class Env {
  @IsString()
  @IsNotEmpty()
  dbUrl: string

  @IsNumber()
  @IsNotEmpty()
  apiPort: number
}

export const env: Env = plainToInstance(Env, {
  dbUrl: process.env.DATABASE_URL,
  apiPort: Number(process.env.API_PORT),
})

const errors = validateSync(env)

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2))
}
