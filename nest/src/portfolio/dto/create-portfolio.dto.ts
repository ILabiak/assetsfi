import { IsNumber, MaxLength, MinLength } from 'class-validator';

export class CreatePortfolioDto {
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsNumber()
  readonly currencyId: number;
}
