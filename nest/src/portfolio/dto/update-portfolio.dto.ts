import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioDto } from './create-portfolio.dto';
import { IsUUID } from 'class-validator';

export class UpdatePortfolioDto extends PartialType(CreatePortfolioDto) {
  @IsUUID()
  readonly uuid: string;
}
