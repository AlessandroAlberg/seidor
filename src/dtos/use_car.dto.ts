
import { IsDate, IsNotEmpty, IsString } from 'class-validator'

export class UseCarDto {
  
    @IsString({ always: true })
    @IsNotEmpty({ always: true })
    driver_id: string

    @IsString({ always: true })
    @IsNotEmpty({ always: true })
    car_id: string

    @IsString({ always: true })
    @IsNotEmpty({ always: true })
    reason: string

    @IsString({ always: true })
    @IsNotEmpty({ always: true })
    start_date: Date

}

export class EndUseCarDto {
  
    @IsString({ always: true })
    @IsNotEmpty({ always: true })
    end_date: Date

}