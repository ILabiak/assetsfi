import {
  IsNumber,
  MaxLength,
  IsString,
  MinLength,
  IsIn,
  Contains,
  IsOptional,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsIn(['MARKET', 'LIMIT'])
  readonly type: string;

  @IsString()
  @MinLength(3)
  @MaxLength(15)
  @Contains('USDT')
  readonly symbol: string;

  @IsString()
  @IsIn(['BUY', 'SELL'])
  readonly side: string;

  @IsOptional()
  @IsString()
  readonly usdtQuantity: number;

  @IsString()
  readonly price: number;

  @IsString()
  readonly quantity: string;
}

export class CancelOrderDto {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  @Contains('USDT')
  readonly symbol: string;

  @IsNumber()
  readonly orderId: number;
}
