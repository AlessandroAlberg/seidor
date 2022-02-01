
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CarDto {
  
    @IsString({ always: true })
    @IsNotEmpty({ always: true })
    board: string

    @IsString({ always: true })
    @IsNotEmpty({ always: true })
    color: string

    @IsString({ always: true })
    @IsNotEmpty({ always: true })
    brand: string

}

export class CarUpdateDto {
  
    @IsString({always: true})
    @IsOptional({ always: true })
    board?: string

    @IsString({always: true})
    @IsOptional({ always: true })
    color?: string

    @IsString({always: true})
    @IsOptional({ always: true })
    brand?: string

}