import {
  IsString,
  IsUUID,
  MinLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateBinanceDto {
  @IsString()
  @MinLength(10)
  readonly apiKey: string;

  @IsString()
  @MinLength(10)
  readonly apiSecret: string;

  @IsBoolean()
  readonly isTestnet: boolean;

  @IsOptional()
  @IsUUID()
  userId: string;
}
