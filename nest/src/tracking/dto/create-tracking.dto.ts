import {
  IsNumber,
  MaxLength,
  IsPositive,
  IsOptional,
  IsString,
  IsDefined,
  MinLength,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Network {
  @MinLength(4)
  @MaxLength(15)
  @IsString()
  code: string;

  @IsNumber()
  id: number;
}

export class CreateTrackingDto {
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Network)
  network: Network;

  @MinLength(7)
  @MaxLength(50)
  address: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  target: number;

  @IsNumber()
  currencyId: number;
}
