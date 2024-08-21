import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackingDto } from './create-tracking.dto';
import {
  IsNumber,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
  MinLength,
  MaxLength,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

class Currency {
  @MinLength(1)
  @MaxLength(5)
  @IsString()
  code: string;

  @IsNumber()
  id: number;
}

export class UpdateTrackingDto extends PartialType(CreateTrackingDto) {
  @IsNumber()
  @IsDefined()
  id: number;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Currency)
  currency: Currency;
}
