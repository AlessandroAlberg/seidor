
import { IsNotEmpty, IsString } from 'class-validator'

export class DriverDto {
  
    @IsString({ always: true })
    @IsNotEmpty({ always: true })
    name: string

}