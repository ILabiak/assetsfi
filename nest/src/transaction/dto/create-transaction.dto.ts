import {
  IsNumber,
  MaxLength,
  IsPositive,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @IsUUID()
  portfolioId: any;

  @IsNumber()
  coinId: number;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  fees: number;

  @IsOptional()
  @MaxLength(150)
  description: string;

  @IsString()
  @MinLength(2)
  @MaxLength(7)
  originCurrency: string;

  @IsNumber()
  @IsPositive()
  costPerUnitInUsd: number;

  @IsNumber()
  @IsPositive()
  costPerUnitInCurrency: number;
}
