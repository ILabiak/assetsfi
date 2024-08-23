import {
  IsNumber,
  MaxLength,
  IsPositive,
  IsDate,
  IsOptional,
  IsString,
  IsDefined,
  MinLength,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
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

export class CreateDonationDto {
  @IsOptional()
  @IsNumber()
  foundationId: number;

  @IsNumber()
  @IsPositive()
  amount: number;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsOptional()
  @MaxLength(150)
  description: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Currency)
  currency: Currency;
}
